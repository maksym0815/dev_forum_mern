const Post = require("../models/post");
const { validationResult } = require("express-validator");

exports.getPosts = async (req,res,next)=>{
        try{
            const posts = await Post.find().select("_id title body");
            return res.json({
                posts
            });
        }catch(error){
            return res.status(404).json({
                error
            });
        }
}

exports.createPost = async (req,res,next)=>{
    const {errors} = validationResult(req);
    if(errors.length>0){
        return res.status(404).json({
            error: errors[0].msg
        });
    }else{
        const post = new Post(req.body);
        try{
            const result = await post.save();
            return res.json({
                post: result,
                message: "Post created successfully!"
            });
        }catch(error){
            return res.status(404).json({
                error: error
            });
        }
    }
}

exports.updatePost = async(req,res,next)=>{
    //  const {errors 
}