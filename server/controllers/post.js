const Post = require("../models/post")
const { validationResult } = require("express-validator")

exports.getPosts = async (req,res,next)=>{
        try{
            const result = await Post.find();
            res.status(200).json({
                posts: result
            })
        }catch(error){
            res.status(404).json({
                error: error
            })
        }
}

exports.createPost = async (req,res,next)=>{
    const {errors} = validationResult(req);
    if(errors){
        res.status(404).json({
            error: errors[0]
        })
    }else{
        const post = new Post(req.body);
        try{
            const result = await post.save();
            res.status(200).json({
                post: result
            })
        }catch(error){
            res.status(404).json({
                error: error
            })
        }
    }
}