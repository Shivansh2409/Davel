import 'dotenv/config.js';
import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'; 
import projectModel from './models/project.model.js'; 
import {generateResult} from './services/ai.service.js';


const PORT = process.env.PORT ;

const server = http.createServer(app);




const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.use(async (socket, next) => {

    try {

        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
        const projectId = socket.handshake.query.projectId;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }


        socket.project = await projectModel.findById(projectId);


        if (!token) {
            return next(new Error('Authentication error'))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new Error('Authentication error'))
        }


        socket.user = decoded;

        next();

    } catch (error) {
        next(error)
    }

})





io.on('connection', socket => {
  console.log(`A user connected: ${socket.id}`);

  // Join the room using the projectId from the middleware
  const room = socket.project._id.toString();
  socket.join(room);
  console.log(`Socket ${socket.id} joined room ${room}`);

  socket.on('project-message', async(data) => {
      // The data received from the client should contain the message text
      // We construct the full message object on the server
      let messagePayload = {};
      const aiPresentInText = data.text.toLowerCase().includes("@ai");

      if(aiPresentInText){
          // Here you can integrate with your AI service to get a response
          // For demonstration, we'll just append a static response
          data.text = data.text.replace(/@ai/gi, "").trim();
          const aiMessage=JSON.parse(await generateResult(data.text))

          messagePayload = {
            text: aiMessage,
            sender: {
                _id: '_ai', // Get user info from the authenticated socket
                email: 'AI Assistant'
            },
            createdAt: new Date()
          };
          
      }else{
          messagePayload = {
            text: data.text,
            sender: {
                _id: socket.user.id, // Get user info from the authenticated socket
                email: socket.user.email
            },
            createdAt: new Date()
          };
      }

      if(!data.text){
          return;
      }

      

      console.log(`Message received in room ${room}:`, messagePayload);
      
      // Use io.to() to emit to EVERYONE in the room, including the sender.
      // This simplifies client-side state management.
      io.to(room).emit('project-message', messagePayload);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    socket.leave(room);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});