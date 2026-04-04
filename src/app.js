//to use express into our project
const express = require('express');
//connect to database
const connectDB = require('./config/database');
//to use express into our app
const app = express();
const User = require('./models/user');

//using express.json() as middleware to convert the incoming data type into JSON

app.use(express.json());

//Get the data from user and save it into DB
app.post("/signup", async (req,res)=>{

    try{

        const ALLOWED_INSERTION = ["firstName","lastName","emailId","password","age","gender", "hobbies"];
        const isInsertionAllowed = Object.keys(req.body).every((k)=>ALLOWED_INSERTION.includes(k));

        if(!isInsertionAllowed){
            throw new Error("Insertion not allowed")
        }

        if(req.body?.hobbies.length>10){
            throw new Error("Skill limit exceeded 10");
        }

        //creating a new instance of the user Model
        const user = new User(req.body);
        
        const savedUser = await user.save();
        
        console.log(savedUser);
        res.send("Sucessfully Saved the JSON Data");
    }
    catch(err){
        res.status(400).send("Data transmission failed! " + err.message);
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

