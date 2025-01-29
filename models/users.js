const mongoose = require("mongoose");
const validator = require("validator");
 
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlenth:3,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        minlenth:4
    },
    age:{
        type:Number,
        min:18
    },
    about:{
        type:String,
        default:"Hey! I'm using Dev Tinder"
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female"]){
                throw new Error("Gender is not valid");
            }
        }
    }
},{timestamps:true,})

const UserModel = mongoose.model("User",userSchema)

module.exports = {UserModel};