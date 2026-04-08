const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequests');

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res,next)=>{
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
                {fromUserId : toUserId}, {toUserId : fromUserId}
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

module.exports = requestRouter;