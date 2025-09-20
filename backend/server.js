import 'dotenv/config.js';
import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'



const PORT = process.env.PORT ;

const server = http.createServer(app);




const io = new Server(server,{
  cors:{
    origin:'*'
  }
});

io.use(async (socket, next) => {

    try {

        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
        // const projectId = socket.handshake.query.projectId;

        // if (!mongoose.Types.ObjectId.isValid(projectId)) {
        //     return next(new Error('Invalid projectId'));
        // }


        // socket.project = await projectModel.findById(projectId);


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





io.on('connection', client => {
  console.log("a user is connected")

  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});