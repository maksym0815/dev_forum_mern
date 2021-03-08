const Users = require("../models/user");
const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

exports.getUsers = async(req,res, next)=>{
    try{
        const users = await Users.find().select("_id email username createdAt profilePicture status")
        return res.json({
            users,
            message: "Fetched users successfully!"
        })
    }catch(error){
        if(!error.statusCode){
            error.statusCode=500;
            next(error);
        }
    }
}

exports.getUser = async(req,res, next)=>{
    try{
        const user =  await Users.findById(req.params.userId).select("_id email username createdAt updatedAt profilePicture status followers following").populate("following followers", "_id email username createdAt updatedAt profilePicture status followers following");
        return res.json({
            user,
            message: "Fetched user successfully!"
        })
    }catch(error){
        if(!error.statusCode){
            error.statusCode=500;
            next(error);
        }
    }
}

exports.updateUser = async (req,res, next)=>{
    try{
        const edit = req.query.edit;
        const user = await Users.findById(req.params.userId);
        let reqBody;
        if(req.userId == user._id){
            switch(edit){
                case "picture":
                    let profilePicture = user.profilePicture;
                    if(req.file){
                        profilePicture = "/"+req.file.path.replace("\\", "/");
                    }
                    if(profilePicture!=user.profilePicture && user.profilePicture!="/images/default.png"){
                        clearImage(user.profilePicture);
                    }
                    user.profilePicture = profilePicture;
                    break;
                case "email":
                    reqBody = JSON.parse(req.body.user);
                    if(user.email!=reqBody.email){
                        const doesUserExist = await Users.find({email: reqBody.email});
                        if(doesUserExist.length>0){
                            const error = new Error("User already exists!");
                            error.statusCode = 409;
                            error.data = "User already exists!";
                            throw error;
                        }
                    }
                    _.extend(user, {...reqBody});
                    break;  
                case "username":
                    reqBody = JSON.parse(req.body.user);
                    _.extend(user, {...reqBody});
                    break;
                case "password":
                    reqBody = JSON.parse(req.body.user);
                    const passwordMatches = await bcrypt.compare(reqBody.oldPassword, user.password);
                    if(passwordMatches){
                        const encryptedPassword = await bcrypt.hash(reqBody.newPassword, +process.env.SALT_ROUNDS);
                        user.password=encryptedPassword;
                    }else{
                        const error = new Error("Old password incorrect!");
                        error.statusCode = 401;
                        error.data = "Old password incorrect!";
                        throw error;
                    }
                    break;
                case "status":
                    reqBody = JSON.parse(req.body.user);
                    _.extend(user, {...reqBody});
                    break;
                default:
                    const error = new Error("No edit specified.");
                    error.statusCode = 404;
                    error.data = "No edit specified.";
                    throw error;
            }
            user.updatedAt = Date.now();
            const updatedUser = await user.save();
            updatedUser.password = undefined;
            return res.json({
                user: updatedUser,
                message: "Picture successfully updated!"
            })
        }else{
            const error = new Error("Unauthorized!");
            error.statusCode = 401;
            error.data = "Unauthorized!";
            throw error;
        }
    }catch(error){
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}


exports.deleteUser = async (req,res,next)=>{
    try{
        if(req.userId == req.params.userId){  
            const user = await Users.findById(req.userId);
            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if(passwordMatches){
                if(user.profilePicture && user.profilePicture!="/images/default.png"){
                    clearImage(user.profilePicture);
                }
                await Users.findByIdAndDelete(req.userId)
                return res.json({
                    message: "User successfully deleted!"
                })
            }else{
                const error = new Error("Password incorrect!");
                error.statusCode = 401;
                error.data = "Password incorrect!";
                throw error;
            }
        }else{
            const error = new Error("Unauthorized!");
            error.statusCode = 401;
            error.data = "Unauthorized!";
            throw error;
        }
    }catch(error){
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}

exports.findUser = async (req,res,next)=>{
    const searchQuery = req.query.search;
    try{
        const users = await Users.find({
            $or: [
                {"username": {$regex: `(?i)^${searchQuery}`}},
                {"email": {$regex: `(?i)^${searchQuery}`}}
            ]
        }).select("_id email username createdAt profilePicture status");
        return res.json({
            users,
            message: "Fetched users successfully!"
        })
    }catch(error){
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}

exports.followUser = async (req,res,next)=>{
    const followedId = req.params.userId;
    const followerId = req.userId;
    try{
        let followedUser = await Users.findById(followedId);
        const followerUser = await Users.findById(followerId);
        if(!followedUser.followers.find(follower=>{return follower==followerId})){
        followedUser.followers.push(followerId);
        followerUser.following.push(followedId);
        } 
        await followedUser.save();
        followedUser = await Users.findById(followedId).select("_id email username createdAt updatedAt profilePicture status followers following").populate("following followers", "_id email username createdAt updatedAt profilePicture status followers following");
        await followerUser.save();
        return res.json({
            user: followedUser,
            message: "Followed user!"
        })
    }catch(error){
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
}

exports.unfollowUser = async (req,res,next)=>{
    const unfollowedId = req.params.userId;
    const unfollowerId = req.userId;
    try{
        let unfollowedUser = await Users.findById(unfollowedId);
        const unfollowerUser = await Users.findById(unfollowerId);
        unfollowedUser.followers = unfollowedUser.followers.filter(follower=>follower!=unfollowerId);
        unfollowerUser.following = unfollowerUser.following.filter(f=>{
            return f!=unfollowedId});
        await unfollowedUser.save();
        unfollowedUser = await Users.findById(unfollowedId).select("_id email username createdAt updatedAt profilePicture status followers following").populate("following followers", "_id email username createdAt updatedAt profilePicture status followers following")
        await unfollowerUser.save();
        return res.json({
            user: unfollowedUser,
            message: "Unfollowed user!"
        })
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