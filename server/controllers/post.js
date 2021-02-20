const Post = require("../models/post");
const { validationResult } = require("express-validator");

exports.getPosts = async (req,res,next)=>{
    try{
        const posts = await Post.find().select("_id title body");
        return res.json({
            posts: posts,
            message: "Fetched posts successfully!"
        });
    }catch(error){
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createPost = async (req,res,next)=>{
    try{
        const {errors} = validationResult(req);
        if(errors.length>0){
            const error = new Error(errors[0].msg);
            error.statusCode = 422;
            error.data = "Validation failed!";
            throw error;
        }
        const post = new Post(req.body);
        const result = await post.save();
        return res.json({
            post: result,
            message: "Post created successfully!"
        });
    }catch(error){
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}