//to use express into our project
const express = require('express');

//to use express into our app
const app = express();

//request handlers
app.use("/main",(req,res)=>{
    res.send("Server is at main");
});


app.use("/dashboard",(req,res)=>{
    res.send("Visiting dashboard!!!");
});

app.use("/",(req,res)=>{
    res.send("server started at port 3007");
});

//we need to listen to our app
app.listen(3007, ()=>{
    console.log("Starting server at port 3007");
});