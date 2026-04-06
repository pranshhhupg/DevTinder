const jwt = require("jsonwebtoken");

const userAuth = (req,res,next) => {
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

        req.userId = userId;
        next();
    }
    catch(err){
        res.status(400).send("Error occurred : " + err.message);
    }

};

module.exports = {
    userAuth,
}