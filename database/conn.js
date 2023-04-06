const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/vices")
.then(()=>{
    console.log("database connected");
})
.catch((error)=>{
    console.log(error);
})

module.exports = mongoose;