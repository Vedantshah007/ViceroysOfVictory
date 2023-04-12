const mongoose = require("mongoose");

const profile_Schema = mongoose.Schema({
    student_id : {
        type: Number,
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