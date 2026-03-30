//to use express into our project
const express = require('express');
const {authAdmin} = require('./middlewares/auth');

//to use express into our app
const app = express();

app.use("/getUserData",(req,res,next)=>{
    console.log("1st RH");
    next();
})

app.get("/getUserData/123",(req,res)=>{
    console.log("2nd RH");
    res.send("Succesfully executed");
})

// app.use("/admin",authAdmin);

// app.get("/admin/getAllData",(req,res)=>{
//     res.send("Data received");
// })

// app.delete("/admin/deleteData",(req,res)=>{
//     res.send("Data deleted");
// })

// app.use("/users",(req,res,next)=>{
//     console.log("1st Route Handler");
//     next();
// })

// app.delete("/users",(req,res,next)=>{
//     res.send("onto next Route Handler");
// })

// //this will match to all only POST method
// app.post("/users",(req,res)=>{
//     res.send("Data received Succesfully");
// })

// //this will match to all only GET method
// app.get("/users",(req,res)=>{
//     res.send({firstName:"Pranshu",LastName:"Gupta"});
// })

// app.delete("/users",(req,res)=>{
//     res.send("Data Deleted Successfully");
// })

// //this will match to all HTTP methods
// app.use("/users",(req,res)=>{
//     res.send("Server is at main");
// });

// //we need to listen to our app
app.listen(3007, ()=>{
    console.log("Starting server at port 3007");
});