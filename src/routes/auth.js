const express = require('express');
const { validateSignUpUser } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const authRouter = express.Router();

//Get the data from user and save it into DB
authRouter.post("/signup", async (req,res)=>{

    try{
        const {firstName,lastName,emailId,password,age,gender,about,hobbies,photoUrl} = req.body;
        //validate data
        validateSignUpUser(req);
        
        //Encrypt the password
        const passwordHash = await bcrypt.hash(password,10);
        // console.log(passwordHash);

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

authRouter.post("/login", async (req,res)=>{
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
        res.send({message : user.firstName + " logged-in Successfully",
            data : user
        });
    }
    catch(err){
        res.status(400).send("Error logging In : " + err.message);
    }
});

authRouter.post("/logout", (req,res)=>{
    res.cookie("token", null, {
        expires : new Date(Date.now()),
    })

    res.send("Logout Sucessful");
});

module.exports = authRouter;