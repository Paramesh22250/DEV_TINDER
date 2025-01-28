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
        res.send("Error in saving data"+e)
    }
})
app.get("/feed",async(req,res)=>{
    try{
        const user = await UserModel.find();
        if(!user){
            res.send("No user found")
        }else{
            res.send(user)
        }
        
    }catch(e){
        res.send("Something went wrong")
    }
})
app.get("/user",async (req,res) => {
    try {
        const user = await UserModel.find({email:"Alice@gmail.coms"})
        if(user.length<1){
            res.send("No user found!!")
        }else{
            res.send(user)
        }
    } catch (error) {
        res.send("Something went wrong")
    }
})

app.patch("/user/:id",async (req,res) => {
    const data=req.body;
    const id = req.params.id;
    console.log(data)
    try {
        const allowed = ["about","age","password","name"];
        const isAllowed = Object.keys(data).every((k)=>allowed.includes(k))
        if(!isAllowed){
            throw new Error("Invalid update")
        }
        await UserModel.findByIdAndUpdate(id,data)
        res.send("Upadated successfully")
    } catch (error) {
        res.send("Something went wrong"+error)
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