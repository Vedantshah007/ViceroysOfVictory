const express = require("express");
const routerPlayerCricket = new express.Router();
const player = require("../models/player_loginModel");
const cricket_match = require("../models/cricket/cricket_matchModel");
const cricket_profile = require("../models/cricket/cricket_profileModel");

//player login 
//player logout remaining

routerPlayerCricket.post("/player/cricket/addMatch", async(req,res)=>{
    const match = {
        tournament_name:req.body.tournament_name,
        team_name_1: req.body.team_name_1,
        team_name_2:req.body.team_name_2,
        scorecard_team1:req.body.scorecard_team1,
        scorecard_team2:req.body.scorecard_team2,
        winning_team:req.body.winning_team,
        player_id:req.body.player_id,
        run:req.body.run,
        wicket:req.body.wicket
    }

    const match_details = new cricket_match(match);
    await match_details.save()
    .then(()=>{
        console.log(("Match saved"));
    })
    .catch((err)=>{
         res.send(err);
    })

    const player_profile = await cricket_profile.findOne({player_id: match_details.player_id});
    
    if(player_profile){
        const player_ID = player_profile._id;
        cricket_profile.findByIdAndUpdate(player_ID,{
        player_runs : req.body.run + player_profile.player_runs,
        player_wickets : req.body.wicket + player_profile.player_wickets
    })
    .then(()=>{
        res.send("Player profile updated")
    })
    .catch((err)=>{
        res.send(err);
    })
    }
    else{
        const newPlayer = new cricket_profile({
            player_id : req.body.player_id,
            player_runs : req.body.run,
            player_wickets : req.body.wicket
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


module.exports = routerPlayerCricket;