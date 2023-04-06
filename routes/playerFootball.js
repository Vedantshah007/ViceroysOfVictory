const express = require("express");
const routerPlayerfootball = new express.Router();
const player = require("../models/player_loginModel");
const football_match = require("../models/Football/football_match");
const football_profile = require("../models/Football/football_profile");

routerPlayerfootball.post("/player/football/addMatch",async(req,res)=>{
    const student_id=req.body.student_id
    const match={
        tournament_name:req.body.tournament_name,
        team_name1: req.body.team_name1,
        team_name2:req.body.team_name2,
        scorecard_team1:req.body.scorecard_team1,
        scorecard_team2:req.body.scorecard_team2,
        winning_team:req.body.winning_team,
        goals:req.body.goals
    }

    // if(!football_match.has(match)){

    const match_details = new football_match(match);
    await match_details.save()
    .then(()=>{
        console.log(("Match saved"));
    })
    .catch((err)=>{
         res.send(err);
    })
// }

    const player_profile = await football_profile.findOne({student_id: match_details.student_id});

    if(player_profile){
        const player_ID = player_profile._id;
        football_profile.findByIdAndUpdate(player_ID,{
        player_name : req.body.player_name,
        goals : req.body.goals + player_profile.goals
    })
    .then(()=>{
        res.send("Player profile updated")
    })
    .catch((err)=>{
        res.send(err);
    })
    }
    else{
        const newPlayer = new football_profile({
            player_name : req.body.player_name,
            student_id : req.body.student_id,
            goals : req.body.goals
        })
        newPlayer.save()
        .then(()=>{
            res.send("New player profile created");
        })
        .catch((err)=>{
            res.send(err);
        })
    }

})

module.exports = routerPlayerfootball