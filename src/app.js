const cookieParser = require('cookie-parser');
require('dotenv').config()
//to use express into our project
const express = require('express');
//connect to database
const connectDB = require('./config/database');
//to use express into our app
const app = express();
const cors = require("cors");

//using express.json() as middleware to convert the incoming data type into JSON
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(cookieParser());

//get all the routes
const authRouter = require("./routes/auth");
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require('./routes/user');

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// first connect the DB, then start the server
connectDB().then(()=>{
    console.log("Database connection estabhlished");
    app.listen(process.env.PORT, ()=>{
        console.log("Starting server at port 3007");
    });    
}).catch(err => {
    console.error("Database cannot be connected!! :" + err.message);
});

