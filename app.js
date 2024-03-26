const express = require("express");
const rateLimit = require('express-rate-limit')
const router = require("./src/routes/api");
const bodyParser = require("body-parser");
var cors = require('cors')
const app = express();
const { default: mongoose } = require("mongoose");

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).

    })
)

app.use(bodyParser.json());
app.use(cors())

// DATA BASE CONNECTION START
const uri ="mongodb+srv://badhanpathan17:badhan420@cluster0.uh3k1ed.mongodb.net/To-Do-Tasker?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(uri)
.then(()=>{console.log("db connect")})
.catch((err)=>{console.log("error",err.message)})


// DATA BASE CONNECTION END


// Route implimantion start

app.use("/api/v1", router);
app.use("*",(req , res)=>{
    res.status(404).json({message:"Not Found"});
});
// Route implimantion end

module.exports = app;









