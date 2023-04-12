const express = require("express");
const routerPlayerTT = new express.Router();
const tabletennis_match = require("../models/table_tennis/tabletennis_match");
const tabletennis_profile = require("../models/table_tennis/tabletennis_profile");

routerPlayerTT.post("/player/tabletennis/addmatch", async(req,res)=>{

    const student_id_1 = await tabletennis_profile.findOne({student_id:req.body.student_id_1});
    const student_id_2 = await tabletennis_profile.findOne({student_id:req.body.student_id_2});

    if(student_id_1 && student_id_2){
        const match = {
            tournament_name:req.body.tournament_name,
            opponent_name:req.body.opponent_name,
            opponent_id : student_id_2.student_id,
            score_player1:req.body.score_player1,
            score_player2:req.body.score_player2,
            winning_player:req.body.winning_player,
        }
        console.log(match);

    const match_details = new tabletennis_match(match);
    await match_details.save()
    .then(() => {
        console.log("match saved"); 
    }).catch((err) => {
        return res.send(err);
    });
   
    if(req.body.winning_player){
        await tabletennis_profile.findByIdAndUpdate(student_id_1._id,{
        matches_won : student_id_1.matches_won+1
     })
     .then(() => {
         res.send("Player profile updated!!!")
     }).catch((err) => {
         res.send(err)
     });
     }
     else{
         console.log(req.body.opponent_id);
         const winning_player = await tabletennis_profile.findOne({student_id : req.body.opponent_id})
         console.log(winning_player);
         const winning_id = winning_player._id
         await badminton_profile.findByIdAndUpdate(winning_id,{
             matches_won : winning_player.matches_won+1
         })
         .then(() => {
             res.send("Player profile updated!")
         }).catch((err) => {
             res.send(err)
         });
     }
 
    
}

else{
    if(student_id_1){
        console.log("player with student_id_2 doesnt exist");
        const newPlayer = new tabletennis_profile({
        student_id : req.body.student_id_2,
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

else if(student_id_2){
    console.log("player with student_id_1 doesnt exist");
    const newPlayer = new tabletennis_profile({
        student_id : req.body.student_id_1,
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
    const newPlayer1 = new tabletennis_profile({
        student_id : req.body.student_id_2,
        player_name : req.body.opponent_name,
        matches_won :0
    })
    await newPlayer1.save()
    .then(()=>{
        //("new player added");
    })
    .catch((err)=>{
        return res.send(err);
    })
    const newPlayer2 = new tabletennis_profile({
        student_id : req.body.student_id_1,
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

module.exports = routerPlayerTT;