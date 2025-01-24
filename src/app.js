const express = require("express");
const app = express();
const {UserModel} = require('../models/users')
const {connectDB} = require('../config/database');


app.post('/signup',async(req,res)=>{
    const newUser = new UserModel({
        name:"Bobby",
        email:"Bobby@gmail.com",
        password:"test@123",
    });
    await newUser.save();
    res.send("User added successfully");
})



connectDB().then(()=>{
    console.log("db connected");
    app.listen(3000,()=>{
        console.log("listening to port 3000")
    })
}).catch(()=>{
    console.log("failed to connect")
})