const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const postSchema = new Schema({
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    title: {
        type: String,
        required: "Please enter a title for the post!",
        minlength: 5,
        maxlength: 150
    },
    body: {
        type: String,
        required: "Please enter a title for the post!",
        minlength: 5,
        maxlength: 2000
    },
    date: {
        type: Date,
        default: Date.now
    },
    // comments: [
    //     {}
    // ],
    // likes: {
    //     type: Number,
    //     default: 0
    // },
    // dislikes: {
    //     type: Number,
    //     default: 0
    // }
})

module.exports = mongoose.model("Post", postSchema);