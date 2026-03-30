const authAdmin = (req,res,next) => {
    console.log("Admin auth is getting checked");
    const token = "xyz";
    const authorization = token==="xyz";
    if(!authorization){
        res.status(401).send("Unauthorized Request");
    }
    else{
        next();
    }
};

module.exports = {
    authAdmin,
}