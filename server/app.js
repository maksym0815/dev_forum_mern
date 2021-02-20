const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const morgan = require("morgan");

//Init App

const app = express();

//3rd party middlewares

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

//Routes

app.use("/auth", authRoutes);
app.use("/", postRoutes);
app.use("/", userRoutes);
app.use("/", (req, res,next)=>{
    res.send("Forum API");
});

//Error handling

app.use((error, req,res,next)=>{
    const status = error.statusCode || 500;
    return res.status(status).json({
        error: error.data,
        message: error.message
    });
})


//Establishing database and server connection

const port = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=>{
    app.listen(port, ()=>{
        console.log(`SERVER RUNNING ON PORT ${port}`)
    })
})
.catch(error=>{
    console.log("DATABASE CONNECTION FAILED!");
    console.log(error);
});