const mongoose = require("mongoose");

const ttSchema = mongoose.Schema({
    tournament_name:{
        //type of tournament
        type: String,
        required :true
    },
    player_name:{
        type: String,
        required :true,
        trim: true,
    },
    opponent_name:{
        type: String,
        required :true,
        trim: true,
    },
    score_player1:{
        type: String,
        required: false,
        default: "0"
    },
    score_player2:{
        type: String,
        required: false,
        default: "0"
    },
    winning_player:{
        //winning player
        type: String,
        required: true,
    },
    player_id:{
        //player id
        type: String,
        require: true
    }
})

const ttModel = mongoose.model("table_tennis_match",ttSchema);

module.exports = ttModel;