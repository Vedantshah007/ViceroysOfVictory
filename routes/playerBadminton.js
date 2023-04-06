const express = require("express");
const routerPlayerBadminton = new express.Router();
const badminton_match = require("../models/badminton/badminton_match");
const badminton_profile = require("../models/badminton/badminton_profile");


routerPlayerBadminton.post("/player/badminton/addmatch", async(req,res)=>{

    const player_id_1 = await badminton_profile.findOne({player_id:req.body.player_id_1});
    const player_id_2 = await badminton_profile.findOne({player_id:req.body.player_id_2});

    if(player_id_1 && player_id_2){
    const match = {
        tournament_name:req.body.tournament_name,
        player_name : req.body.player_name,
        opponent_name:req.body.opponent_name,
        score_player1:req.body.score_player1,
        score_player2:req.body.score_player2,
        winning_player:req.body.winning_player,
        player_id : player_id_1.player_id
    }
    console.log(match);

    const match_details = new badminton_match(match);
    await match_details.save()
    .then(() => {
        console.log("match saved");
    }).catch((err) => {
        return res.send(err);
    });

    const player_profile = await badminton_profile.findOne({player_id : match_details.player_id}); 
    const winningPlayer_id = (await badminton_profile.findOne({player_name : match_details.winning_player}))._id;

        console.log(player_profile);
        console.log(winningPlayer_id);
        const player_ID = player_profile._id;
        console.log(player_ID);
        if(player_ID==winningPlayer_id){
           await badminton_profile.findByIdAndUpdate(player_ID,{
           matches_won : player_profile.matches_won+1
        })
        .then(() => {
            res.send("Player profile updated!!!")
        }).catch((err) => {
            res.send(err)
        });
        }
        else{
            const winning_player = await badminton_profile.findOne({player_name : match_details.winning_player})
            await badminton_profile.findByIdAndUpdate(winningPlayer_id,{
                matches_won : winning_player.matches_won+1
            })
            .then(() => {
                res.send("Player profile updated")
            }).catch((err) => {
                res.send(err)
            });
        }
    
}
    else{

        if(player_id_1){
            console.log("player_id_2 doesnt exist");
            const newPlayer = new badminton_profile({
            player_id : req.body.player_id_2,
            player_name : req.body.opponent_name,
            matches_won :0
        })
        await newPlayer.save()
        .then(()=>{
            res.send("new player added");
        })
        .catch((err)=>{
            res.send(err);
        })
    }

    else if(player_id_2){
        console.log("player_id_1 doesnt exist");
        const newPlayer = new badminton_profile({
            player_id : req.body.player_id_1,
            player_name : req.body.player_name,
            matches_won :0
        })
        await newPlayer.save()
        .then(()=>{
            res.send("new player added");
        })
        .catch((err)=>{
            res.send(err);
        })
    }

    else{
        console.log("both doesnt exist");
        const newPlayer1 = new badminton_profile({
            player_id : req.body.player_id_2,
            player_name : req.body.opponent_name,
            matches_won :0
        })
        await newPlayer1.save()
        .then(()=>{
            //res.send("new player added");
        })
        .catch((err)=>{
            return res.send(err);
        })
        const newPlayer2 = new badminton_profile({
            player_id : req.body.player_id_1,
            player_name : req.body.player_name,
            matches_won :0,
        })
        await newPlayer2.save()
        .then(()=>{
            res.send("new player added");
        })
        .catch((err)=>{
            return res.send(err);
        })
    }
}
})

module.exports = routerPlayerBadminton;