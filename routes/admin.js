const express = require("express");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin_loginModel");
const playerModel = require("../models/player_loginModel");
require("dotenv").config();
const auth = require("../authentication/admin_authentication");

const routerAdmin = new express.Router();

routerAdmin.post("/admin/setAdmin",async(req,res)=>{
    console.log(req.body);
    const admin = new adminModel({
        name : req.body.name,
        email : req.body.email,
        password:req.body.password,
    });
    await admin.save()
    .then(() => {
        res.send(admin);
    })
    .catch((err) => {
        res.status(400).send(err);
    });
})

routerAdmin.post("/admin/login",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    try {
        const admin = await adminModel.findOne({email : email});
        console.log(admin);
        console.log(admin.password);
        if(admin.password === password){
            console.log("gayu?");
            const token = jwt.sign({"_id" : admin._id},"process.env.SECRET_KEY");
            admin.tokens = admin.tokens.concat({tokens:token});
            await adminModel.findByIdAndUpdate(admin._id,{
                tokens : admin.tokens,
            })
            .then(()=>{
                res.send({admin,token})
            })
            .catch((err)=>{
                res.status(404).send(err);
            })
        }
        else{
            res.status(404).send("incorrect password");
        }
    } catch (error) {
        res.status(404).send(" User not found !!");
    }
})

routerAdmin.post("/admin/logout",async (req,res)=>{
    
})

routerAdmin.post("/admin/setPlayer",async (req,res)=>{

    const player = new playerModel(
        {
            name : req.body.name,
            email : req.body.email,
            password:req.body.password,
            gender:req.body.gender,
            height:req.body.height,
            weight:req.body.weight,
            student_id : req.body.student_id
        }
    )

    if(await playerModel.findOne({student_id : req.body.student_id})){
        res.status(400).send("Player already exists");
    }
    else{
        await player.save()
        .then(()=>{
        res.send(player);
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
    }

})

module.exports = routerAdmin;