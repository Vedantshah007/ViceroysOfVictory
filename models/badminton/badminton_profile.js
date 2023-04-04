const mongoose = require("mongoose");

const profile_Schema = mongoose.Schema({
    player_id : {
        type: String,
        required : true
    },
    player_name : {
        type : String,
        required : true
    },
    matches_won :{
        type : Number,
        required : true,
        default : 0
    }
})

const profile_model = mongoose.model("badminton_profile",profile_Schema);
module.exports = profile_model;