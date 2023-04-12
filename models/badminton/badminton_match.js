const mongoose = require("mongoose");

const badmintonSchema = mongoose.Schema({
    tournament_name:{
        //type of tournament
        type: String,
        required :true
    },
    opponent_name:{
        type: String,
        required :true,
        trim: true,
    },
    opponent_id:{
        type: Number,
        require: true
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
        type: Boolean,
        required: true,
    },

})

const badmintonModel = mongoose.model("badminton_match",badmintonSchema);

module.exports = badmintonModel;