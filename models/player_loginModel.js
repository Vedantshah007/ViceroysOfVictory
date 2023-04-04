const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email :{
        type: String,
        required : true,
        trim : true,
        validate(value){
            const email = value;
            const validateEmail_1 ="@iiitvadodara.ac.in";
            const validateEmail_2 ="@iiitv.ac.in";
            if(email.includes(validateEmail_1) ||
            email.includes(validateEmail_2)){
                console.log("Email valid");
            }
            else{
                throw new Error("Email not valid");
            }
        }
    },
    password : {
        type : String,
        required : true,
    },
    gender:{
        type: String,
        required: true,
        validate(value){
            if(!value=="male"||!value=="female"||!value=="other"){
                throw new Error('Invalid gender')
            }
        }

    },
    height:{
        type: Number,
        required : true
    },
    weight:{
        type: Number,
        required : true
    },
    player_id : {
        type : String,
        required : true,
        unique : true
    }
})

const playerModel = mongoose.model("player",playerSchema);

module.exports = playerModel;