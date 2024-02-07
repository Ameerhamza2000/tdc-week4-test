const express =require ('express');
const dotenv =require('dotenv');
const connectDB=require ('./DB/connectDB');
// import auth from './middlewares/auth.js';

// routes handlers
const userHandler =require ('./routes/usersRoute');
const taskHandler =require('./routes/tasksRoute.js');


const app=express();

// .env config
dotenv.config();

// MongoDB connection
connectDB();

// middleware
app.use(express.json());

// Routes

app.use('/api/user',userHandler);
app.use('/api/task',taskHandler);

// server PORT
const PORT=process.env.PORT;

const server = app.listen(PORT,()=>{console.log(`Server is listening on PORT ${PORT}.....`)});

module.exports= server;
