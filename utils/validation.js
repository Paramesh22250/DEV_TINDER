const validator = require("validator")

const validateSignup=(req)=>{
    const {name,email,password} = req.body;

    if(name.lenght<3){
        throw new Error("Not a valid Name")
    }
    if(!validator.isEmail(email)){
        throw new Error("not a valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Not a stong password")
    }
}

module.exports = {validateSignup};