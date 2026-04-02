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
    //creating a new instance of the user Model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("Sucessfully Saved the JSON Data");
    }
    catch(err){
        res.status(400).send("Data transmission failed!");
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

app.patch("/users",async (req,res)=>{
    const userId = req.body.id;

    try{
        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                firstName : "Virat",
                lastName : "Kohli",
                emailId : "viratkohliLovesAnushka",
            },
            {
                returnDocument : "before"
            }
        );
        console.log(updatedUser);
        if(!updatedUser) res.status(404).send("User not Found!");
        res.send("Successfully Updated the data");
    }
    catch(err){
        res.status(400).send("Something went wrong");
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

