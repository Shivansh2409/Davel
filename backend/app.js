import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import main from './db/db.js';
import userRoute from './routes/user.route.js';
import projectRoute from './routes/project.route.js';
import cookieParser from 'cookie-parser';

main().then(() => {
    console.log("Connected to MongoDB");
}
).catch(err => {
    console.error("MongoDB connection error:", err);
});



const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/users', userRoute);
app.use('/projects',projectRoute);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


export default app;