const Post = require("../models/post");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const path = require("path");
const fs = require("fs");

exports.getPosts = async (req,res,next)=>{
    try{
        const posts = await Post.find().select("_id title body").populate("creator", "username email");
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

exports.getPostsByUser = async (req, res, next)=>{
    try{
        const user = await User.findById(req.userId)
        if(!user){
            const error = new Error("No user with the id exists.");
            error.statusCode = 404;
            error.data = "No user with the id exists.";
            throw error;
        }
        if(req.userId == req.params.userId){
            const posts = await Post.find({creator: req.userId}).select("_id title body").populate("creator", "username email")
            return res.json({
                posts: posts,
                message: "Fetched posts by user successfully!"
            });
        }else{
            const error = new Error("Not authorized!");
            error.statusCode = 422;
            error.data = "Not authorized!";
            throw error;
        }
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
        if(req.file){
            const imageUrl = req.file.path.replace("\\", "/");
            post.image = imageUrl;
        }
        post.creator = req.userId;
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

exports.updatePost = async(req, res ,next)=>{
    try{
        const {errors} = validationResult(req);
        if(errors.length>0){
            const error = new Error(errors[0].msg);
            error.statusCode = 422;
            error.data = "Validation failed!";
            throw error;
        }
        let image = req.body.image;
        if(req.file){
            image = req.file.path.replace("\\", "/");
        }
        const post = await Post.findById(req.params.postId);
        if(!post){
            const error = new Error("Could not find post.");
            error.statusCode = 404;
            error.data = "Could not find post.";
            throw error;
        }
        if(post.creator.toString() != req.userId){
            const error = new Error("Not authorized!");
            error.statusCode = 422;
            error.data = "Not authorized!";
            throw error;
        }
        if(image !== post.image){
            clearImage(post.image);
        }
        _.extend(post, req.body);
        post.image = image;
       const result = await post.save();
       res.status(200).json({
           message: "Post updated successfully!",
           post: result
       });
    }catch(error){
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}

exports.deletePost = async (req, res, next)=>{
    try{
        const post = await Post.findById(req.params.postId);
        if(!post){
            const error = new Error("Could not find post.");
            error.statusCode = 404;
            error.data = "Could not find post.";
            throw error;
        }
        if(post.creator.toString() != req.userId){
            const error = new Error("Not authorized!");
            error.statusCode = 422;
            error.data = "Not authorized!";
            throw error;
        }
        clearImage(post.image);
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({
            message: "Post updated successfully!",
            post: result
        });
    }catch(error){
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}

const clearImage = (filePath)=>{
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, err=>{
        console.log(err);
    })
}