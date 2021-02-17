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
    creationDate: {
        type: Date,
        default: Date.now
    },
    updatedDate:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userModel);
