const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const mongoose = require("mongoose");
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const morgan = require("morgan");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));


app.use("/post", postRoutes);
app.use("/auth", authRoutes);

app.use("/", (req, res,next)=>{
    res.send("Forum API");
});

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
