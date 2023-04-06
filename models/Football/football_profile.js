const mongoose = require('mongoose')

const football_profileSchema = mongoose.Schema({
    player_name:{
        type:String,
        required:true
    },
    student_id:{
        type:Number,
        required:true
    },
    goals:{
        type:Number,
        required:true,
        default:0
    }
})

const football_profile  = mongoose.model("football_profile",football_profileSchema);
module.exports = football_profile