const mongoose = require('mongoose');

const football_schema = mongoose.Schema({
    tournament_name:{
        type:String,
        required:true
    },
    team_name1:{
        type:String,
        required:true
    },
    team_name2:{
        type:String,
        required:true
    },
    scorecard_team1:{
        type:Number,
        required:true,
        default:0
    },
    scorecard_team2:{
        type:Number,
        required:true,
        default:0
    },
    winning_team:{
        type:String,
        required:true
    },
    goals:{
        type:Number,
        required:true,
        default:0
    }
})

const football_match = mongoose.model('football_match',football_schema);
module.exports = football_match