const express = require("express");
require("./database/conn");
const routerAdmin = require("./routes/admin");
const routerPlayer = require("./routes/playerCricket");
const app = express();

app.use(express.json());
app.use(routerAdmin);
app.use(routerPlayer);
app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(3000,()=>{
    console.log("running on port 3000");
})