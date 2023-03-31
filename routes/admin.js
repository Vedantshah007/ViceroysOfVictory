const express = require("express");
//const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin_loginModel");
const playerModel = require("../models/player_loginModel");

const routerAdmin = new express.Router();

routerAdmin.post("/admin/setAdmin",async(req,res)=>{
    console.log(req.body);
    const admin = new adminModel(req.body);
    await admin.save()
    .then(() => {
        res.send(admin);
    })
    .catch((err) => {
        res.status(400).send(err);
    });
})

routerAdmin.post("/admin/login",async (req,res)=>{
    
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
            token : req.body.token
        }
    )

    if(await playerModel.findOne({email : req.body.email})){
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