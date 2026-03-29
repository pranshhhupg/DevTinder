//to use express into our project
const express = require('express');

//to use express into our app
const app = express();

app.use("/users/:userId/:name/:password",(req,res)=>{
    res.send(req.params);
})

//this will match to all only POST method
app.post("/users",(req,res)=>{
    res.send("Data received Succesfully");
})

//this will match to all only GET method
app.get("/users",(req,res)=>{
    res.send({firstName:"Pranshu",LastName:"Gupta"});
})

app.delete("/users",(req,res)=>{
    res.send("Data Deleted Successfully");
})

//this will match to all HTTP methods
app.use("/users",(req,res)=>{
    res.send("Server is at main");
});

//we need to listen to our app
app.listen(3007, ()=>{
    console.log("Starting server at port 3007");
});