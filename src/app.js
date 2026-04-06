//to use express into our project
const express = require('express');
//connect to database
const connectDB = require('./config/database');
//to use express into our app
const app = express();
const User = require('./models/user');
const {validateSignUpUser} = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');

//using express.json() as middleware to convert the incoming data type into JSON

app.use(express.json());
app.use(cookieParser());

//Get the data from user and save it into DB
app.post("/signup", async (req,res)=>{

    try{
        const {firstName,lastName,emailId,password,age,gender,about,hobbies,photoUrl} = req.body;
        //validate data
        validateSignUpUser(req);
        
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);

        //creating a new instance of the user Model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash,
            age,
            gender,
            hobbies,
            about,
            photoUrl,
        });
        
        const savedUser = await user.save();

        //create JWT-token
        const token = await user.getJWT();

        //save JWT in cookie
        res.cookie("token", token, {
            expires: new Date(Date.now() + 24 * 3600000) // cookie will be removed after 24 hour
        });
        
        console.log(savedUser);
        res.send("Sucessfully Saved the JSON Data");
    }
    catch(err){
        res.status(400).send("Data transmission failed! " + err.message);
    }
    
});

app.get("/login", async (req,res)=>{
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId : emailId});

        if(!user){
            throw new Error("Invalid Credentials!");
        }
        const passwordPresentInDb = password;
        const isPasswordCorrect = await user.validatePassword(passwordPresentInDb);

        if(!isPasswordCorrect){
            throw new Error("Invalid Credentials!");
        }
        else{
            //password is correct log-in the user by generating JWT and wrapping it inside cookie
            //create a JWT Token
            const token = await user.getJWT();

            //add the token to cookies
            res.cookie("token", token);
        }
        res.send("Logged-in Successfully!");
    }
    catch(err){
        res.status(400).send("Error logging In : " + err.message);
    }
});

app.get("/profile", userAuth, async (req,res)=>{
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error occured : "+err.message);
    }

});

//Search the Database with the data sent by user
app.get("/users",async (req,res)=>{
    const data = req.body.gender;

    try{
        const Users = await User.findOne({gender : data});
        if(Users.length==0){
            res.status(404).send("User not Found!");
        }
        else{  
            res.send(Users);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong!");
    }
});

app.delete("/users", async (req,res)=>{
    const userId = req.body.id;

    try{
        const users = await User.findByIdAndDelete(userId);
        if(!users) res.send("No data found");

        res.send("Successfully deleted");
    }
    catch(err){
        res.send("Something went wrong");
    }
});

app.patch("/users/:userID",async (req,res)=>{
    const userId = req.params?.id;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["firstName","lastName","password","age","gender","photoUrl","about","hobbies"];
        const isUpdateAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update not allowed")
        }

        if(data?.skills.length>10){
            throw new Error("Skill limit exceeded 10");
        }

        const updatedUser = await User.findByIdAndUpdate(userId,data);

        console.log(updatedUser);
        if(!updatedUser) res.status(404).send("User not Found!");
        res.send("Successfully Updated the data");
    }
    catch(err){
        res.status(400).send("UPDATE FAILED : " + err.message);
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

