const express = require("express");
const routerView = new express.Router();
const player = require("../models/player_loginModel");


routerView.get("/view/player", async(req,res)=>{
    try{
        const players = await player.find();
        if(players.length >0){
            res.status(200).send(players);
        }
        else{
            res.status(404).send("No players found");
        }

    }
    catch(err){
        res.status(400).send(err);
    }
})

routerView.get("/view/player/:name", async(req,res)=>{
    try{
        const players = await player.find({name : req.params.name});
        if(players.length >0){
            res.status(200).send(players);
        }
        else{
            res.status(404).send("No players found");
        }

    }
    catch(err){
        res.status(400).send(err);
    }
})

module.exports = routerView;
