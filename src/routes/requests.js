const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequests');

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params?.toUserId;
        const status = req.params?.status;

        const ALLOWED_STATUS = ["interested", "ignored"];

        if(!ALLOWED_STATUS.includes(status)){
            throw new Error("Invalid Status Entered!");
        }

    
        if(toUserId == fromUserId){
            throw new Error("Can't send request to yourself!");
        }


        const validateRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        });

        if(validateRequest){
            throw new Error("Invalid Request Entered!");
        }

        const receivingUser = await User.findById(toUserId);

        if(!receivingUser){
            throw new Error("Receiver Does not Exists!");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message : req.user.firstName + " "+ status + " " +receivingUser.firstName,
            data : data
        })
    }
    catch(err){
        res.status(400).send("Error occured " + err.message);
    }
});

requestRouter.post("/request/review/:action/:requestId", userAuth,async (req,res)=>{
    
    try{
        const loggedInUser = req.user;
        const status = req.params?.action;
        const requestId = req.params?.requestId;

        const allowed_action = ["accepted", "rejected"];

        if(!allowed_action.includes(status)){
            throw new Error("invalid status");
        }

        const validRequestConnection = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        });

        if(!validRequestConnection){
            throw new Error("No Connection Found!");
        }

        const Sender = await User.findById(validRequestConnection.fromUserId);

        validRequestConnection.status = status;

        const data = await validRequestConnection.save();

        res.json({message : "Request of "+ Sender.firstName + " is " + status + " by " +loggedInUser.firstName},
            data
        );
    }
    catch(err){
        res.status(400).json({message : "error occured : " + err.message});
    }
    
});

module.exports = requestRouter;