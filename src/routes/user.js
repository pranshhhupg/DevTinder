const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequests');
const userRouter = express.Router();

const USER_DATA =  "firstName lastName age gender photoUrl about hobbies";

userRouter.get("/user/requests", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const findRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested",    
        }).populate("fromUserId", USER_DATA);

        if(!findRequests){
            res.send("No Request Found!");
        }
        
        res.json({message : "Requests Fetched Successfully for "+ loggedInUser.firstName, 
        data : findRequests
        });
    }

    catch(err){
        res.status(400).json({message : "Error occured " + err.message});
    }
});

userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
    
        const connections = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUser._id, status : "accepted"},
                {toUserId : loggedInUser._id, status : "accepted"}
            ]
        }).populate("fromUserId", USER_DATA)
        .populate("toUserId", USER_DATA);
    
        if(!connections){
            req.send({message : "No connection Found"});
        }
        
        const data = connections.map((row)=>{
            if(row.toUserId._id.toString()===loggedInUser._id.toString()) return row.fromUserId;
            return row.toUserId;
        })

        res.send({message : "Showing Established Connections",
            data : data
        });
    }
    catch(err){
        res.status(404).send("Error occured " + err.message);
    }
    
});

module.exports = userRouter;