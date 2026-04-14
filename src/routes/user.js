const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequests');
const User = require('../models/user');
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

userRouter.get("/user/feed", userAuth, async(req,res)=>{
    try{
        //THOUGHT PROCESS
        //I dont want users in feed which are:
        //1. To whom i have already sent the request like interested/rejected
        //2. My connections
        //3. Users from whom i have received the requests

        //pagination
        const page = (req.query.page) || 1;
        let limit = (req.query.limit) || 2;
        limit = limit > 20 ? 20 : limit;
        const skip = (page-1)*limit;

        const loggedInUser = req.user;

        const usersToRemoveFromFeed = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUser._id},
                {toUserId : loggedInUser._id},
            ]
        });

        const hideUsersFromFeed = new Set();

        usersToRemoveFromFeed.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUsersFromFeed)} },
                {_id : {$ne : loggedInUser._id}},
            ]
        }).select(USER_DATA).skip(skip).limit(limit);

        res.json({message : "Showing the feed for " + loggedInUser.firstName,
            data : users
        });

    }
    catch(err){
        res.status(400).send("error message " + err.message);
    }
    
});

module.exports = userRouter;