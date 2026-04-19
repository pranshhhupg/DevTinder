const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const { validateEditData, validateNewPassword } = require('../utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cors = require('cors');

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error occured : "+err.message);
    }

});

profileRouter.put("/profile/edit", userAuth, async (req,res)=>{
    try{
        if(!validateEditData(req)){
            throw new Error("Invalid Data Entered");
        }

        const loggedInUser = req.user;
        console.log(loggedInUser);

        Object.keys(req.body).forEach((key)=>loggedInUser[key] = req.body[key]);
        console.log(loggedInUser);

        await loggedInUser.save();

        res.send({
            message : loggedInUser.firstName + ", You're Data Updated Successfully",
            data : loggedInUser
        });
    }
    catch(err){ 
        res.status(400).send("ERROR OCCURED : "+err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req,res) => {
    try{    
        const user = req.user;
        const passwordInputGivenByUser = req.body.password;
        const newPassword = req.body.newPassword;

        validateNewPassword(passwordInputGivenByUser);

        const match = await user.validatePassword(passwordInputGivenByUser);

        if(!match){
            throw new Error("Old Password Entered by User is invalid");
        }

        const newPasswordHash = await bcrypt.hash(newPassword,10);

        user.password = newPasswordHash;

        await user.save();

        res.send("New password stored succesfully");
    }
    catch(err){
        res.status(400).send("ERROR OCCURED : "+err.message);
    }
});

module.exports = profileRouter;