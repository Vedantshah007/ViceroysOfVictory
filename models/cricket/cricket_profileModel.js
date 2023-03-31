const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    player_id : {
        type : String,
        required : true
    },
    player_runs : {
        type : Number,
        required : true,
        default : 0
    },
    player_wickets : {
        type : Number,
        required : true,
        default : 0
    }
})

const profileModel = mongoose.model("cricket_profile",profileSchema);

module.exports = profileModel;