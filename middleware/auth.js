const auth = (req,res,next)=>{
    let key = "secret";
    let authenticate = key ==="secret";
    if(!authenticate){
        res.send("not authorized").status(401);
    }else{
        next()
    }

}

module.exports = {auth}