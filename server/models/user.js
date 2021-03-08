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
    status: {
        type: String,
        default: "Not set.",
        trim: true
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
    },
    followers: [{type: mongoose.Types.ObjectId, ref: "User"}],
    following: [{type: mongoose.Types.ObjectId, ref: "User"}],
})

module.exports = mongoose.model("User", userModel);
