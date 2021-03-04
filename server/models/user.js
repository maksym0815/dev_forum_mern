const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModel = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    profilePicture:{
        type: String,
        default: "/images/default.png"
    }
})

module.exports = mongoose.model("User", userModel);
