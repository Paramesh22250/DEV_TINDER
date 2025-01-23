const express = require("express");
const app = express();
const {auth} = require('../middleware/auth');

app.use("/admin",auth)
app.use("/admin/dashboard",(req,res)=>{
    res.send("DASHBOARD")
})
app.use("/admin/profile",(req,res)=>{
    res.send("Admin profile")
})
app.use("/user/profile/update",auth,(req,res)=>{
    res.send("Please Update User profile")
})

// app.use("/hello/user",(req,res)=>{
//     res.status(200)
//     res.send("Hello from user!!")
// })
// app.use("/hello",(req,res)=>{
//     res.status(200)
//     res.send("Hello from hello!!")
// })

// app.use("/user",(req,res,next)=>{
//     console.log("1st response")
//     next()
// },(req,res,next)=>{
//     console.log("2nd response")
//     next()
// },(req,res)=>{
//     console.log("3rd responses")
//     res.send("3-response sent")
// }
// )
app.listen(3000,()=>{
    console.log("listening to port 3000")
})