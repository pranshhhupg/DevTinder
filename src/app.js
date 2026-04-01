//to use express into our project
const express = require('express');
//connect to database
const connectDB = require('./config/database');
//to use express into our app
const app = express();
const User = require('./models/user');

app.post("/signup", async (req,res)=>{
    //creating a new instance of the user Model
    const user = new User({
        firstName : "Mahendra Singh",
        lastNamee : "Dhoni",
        emailIdd : "msd007@gmail.com",
        gender : "male",
        age : 44,
        password : "msdreal@123",
    });

    try{
        await user.save();
        res.send("Data succesfully added");
    }
    catch(err){
        res.status(400).send("Error occured " + err.message);
    }
});

// first connect the DB, then start the server
connectDB().then(()=>{
    console.log("Database connection estabhlished");
    app.listen(3007, ()=>{
        console.log("Starting server at port 3007");
    });    
}).catch(err => {
    console.error("Database cannot be connected!! :" + err.message);
});

