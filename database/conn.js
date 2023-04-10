const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/vices")
.then(()=>{
    console.log("database connected");
})
.catch((error)=>{
    console.log(error);
})

module.exports = mongoose;