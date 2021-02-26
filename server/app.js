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
const multer = require("multer");
const path = require("path");
const {v4} = require("uuid")

//Init App

const app = express();

//multer setup

const fileStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "images");
    },
    filename: (req, file, cb)=>{
        cb(null, v4())
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype==="image/png" ||
    file.mimetype==="image/jpg" ||
    file.mimetype==="image/jpeg"
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

//3rd party middlewares

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single("image"));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use("/images", express.static(path.join(__dirname, "images")));

//Routes

console.log(path.join(__dirname, "/images"))
app.use("/auth", authRoutes);
app.use("/", postRoutes);
app.use("/", userRoutes);
app.use("/", (req, res,next)=>{
    res.json({
        "/auth/register": "POST - To register",
        "/auth/login": "POST - To login",
        "/auth/logout": "GET - To logout",
        "/posts": "GET - To get all posts",
        "/posts/:userId": "GET - To get all posts by a user",
        "/post": "POST - To add a new post",
        "/post/:postId": "PUT - To update a post",
        "/post/:postId": "DELETE - To delete a post",
        "/users": "GET - To get all users",
        "/user/userId": "GET - To get a particular user",
        "/user/userId": "PUT - To update details of a user",
        "/user/userId": "DELETE - To delete a user",
    });
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