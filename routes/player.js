const express = require("express");
const playerModel = require("../models/player_loginModel");
const routerPlayer = new express.Router();
const jwt = require("jsonwebtoken");

routerPlayer.post("/player/login",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    try {
        const player = await playerModel.findOne({email : email});
        console.log(player);
        console.log(player.password);
        if(player.password === password){
            console.log("gayu?");
            const token = jwt.sign({"_id" : player._id},"process.env.SECRET_KEYYYYYY");
            player.tokens = player.tokens.concat({tokens:token});
            await playerModel.findByIdAndUpdate(player._id,{
                tokens : player.tokens,
            })
            .then(()=>{
                res.send({player,token})
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

module.exports = routerPlayer;