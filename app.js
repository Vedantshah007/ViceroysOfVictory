const express = require("express");
require("./database/conn");
const routerAdmin = require("./routes/admin");
const routerPlayerCricket = require("./routes/playerCricket");
const routerPlayerBadminton = require("./routes/playerBadminton");
const routerPlayerfootball = require("./routes/playerFootball");
const routerView = require("./routes/viewPlayer");
const app = express();

app.use(express.json());
app.use(routerAdmin);
app.use(routerPlayerCricket);
app.use(routerPlayerBadminton);
app.use(routerPlayerfootball);
app.use(routerView);

app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(3000,()=>{
    console.log("running on port 3000");
})