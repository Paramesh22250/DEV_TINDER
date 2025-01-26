const express = require("express");
const app = express();
const {UserModel} = require('../models/users')
const {connectDB} = require('../config/database');

app.use(express.json());
app.post('/signup',async(req,res)=>{
    console.log(req.body)
    const newUser = new UserModel(req.body);
    try {
        await newUser.save();
        res.send("User added successfully");
    } catch (e) {
        res.send("Error in saving data")
    }
})



connectDB().then(()=>{
    console.log("db connected");
    app.listen(3000,()=>{
        console.log("listening to port 3000")
    })
}).catch(()=>{
    console.log("failed to connect")
})