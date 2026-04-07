const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth,async (req,res)=>{
    try{
        const userId = req.userId;
        const user = await User.findById(userId);

        if(!user){
            throw new Error("User does not exists!");
        }

        res.send(user.firstName + " sending a request");
    }
    catch(err){
        res.status(400).send("Error occured " + err.message);
    }
});

module.exports = requestRouter;