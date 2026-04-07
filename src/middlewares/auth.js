const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next) => {
    try{
        const cookies = req.cookies;
        const {token} = cookies;

        if(!token){
            throw new Error("Invalid token! Please log-in!");
        }

        const decodedObj = jwt.verify(token, "devTinder@1210");

        const {userId} = decodedObj;

        if(!userId){
            throw new Error("User not found!");
        }
        
        const user = await User.findById(userId);
        req.userId = userId;
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).send("Error occurred : " + err.message);
    }

};

module.exports = {
    userAuth,
}