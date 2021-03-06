const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: "Please enter a title for the post!",
        trim: true,
        minlength: 5,
        maxlength: 150
    },
    body: {
        type: String,
        required: "Please enter a title for the post!",
        minlength: 5,
        maxlength: 2000
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", postSchema);