const mongoose = require('mongoose');

const cric_match_Schema = mongoose.Schema({
    tournament_name:{
        //type of tournament
        type: String,
        required :true
    },
    team_name_1:{
        // team1
        type: String,
        required :true,
        trim: true,
    },
    team_name_2:{
        //team2
        type: String,
        required: true
    },
    scorecard_team1:{
        type: String,
        required: false,
        default: "0/0"
    },
    scorecard_team2:{
        type: String,
        required: false,
        default: "0/0"
    },
    winning_team:{
        //winning team
        type: String,
        required: true,
    },
    player_id:{
        //player id
        type: String,
        require: true
    },
    run:{
        //runs made by pid
        type: Number,
        require: true,
        default: 0
    },
    wicket:{
        //wickets taken by pid
        type: Number,
        default: 0,
        require: true
    }

})

const cricket_match = mongoose.model('cricket_match',cric_match_Schema);
module.exports = cricket_match;