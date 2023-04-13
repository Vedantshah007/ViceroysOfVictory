const jwt = require("jsonwebtoken");
 require("dotenv").config();

 const admin = require("../models/admin_loginModel");

const auth = async (req,res,next)=>{
    if(req.header('authtoken')){
        const token = req.header('authToken');
        const user = await jwt.verify(token,"process.env.SECRET_KEY");
        console.log(user);

       const authuser = await admin.findOne({_id : user._id , 'tokens.token' : token})
        .then(()=>{
            req._id = authuser._id;
            req.email = authuser.email;
            req.token = token;

            next();
        })
        .catch((err)=>{
            res.status(404).send("Sign in required")
        })
    }
    else{
        res.status(404).send("Sign in required no user found") 
    }
}

module.exports = auth;