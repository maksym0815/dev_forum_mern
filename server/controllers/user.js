const Users = require("../models/user");
const _ = require("lodash");
const path = require("path");
const fs = require("fs");

exports.getUsers = async(req,res, next)=>{
    try{
        const users = await Users.find().select("_id email username createdAt profilePicture")
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
        const user = await Users.findById(req.params.userId).select("_id email username createdAt updatedAt profilePicture")
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
        const reqBody = JSON.parse(req.body.user);
        const user = await Users.findById(req.params.userId);
        if(req.userId == user._id){
            if(user.email!=reqBody.email){
                const doesUserExist = await Users.find({email: reqBody.email});
                if(doesUserExist.length>0){
                    const error = new Error("User already exists!");
                    error.statusCode = 409;
                    error.data = "User already exists!";
                    throw error;
                }
            }
            let profilePicture = reqBody.profilePicture;
            if(req.file){
                profilePicture = "/"+req.file.path.replace("\\", "/");
            }
            if(profilePicture!="" && profilePicture!=undefined && profilePicture!=null && profilePicture!=user.profilePicture && user.profilePicture!="/images/default.png"){
                clearImage(user.profilePicture);
            }
            _.extend(user, {...reqBody, profilePicture: user.profilePicture});
            if(profilePicture!="" && profilePicture!=undefined && profilePicture!=null){
                user.profilePicture = profilePicture;
            }
            user.updatedAt = Date.now();
            const updatedUser = await user.save();
            updatedUser.password = undefined;
            return res.json({
                user: updatedUser,
                message: "User successfully updated!"
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
            if(user.profilePicture && user.profilePicture!="/images/default.png"){
                clearImage(user.profilePicture);
            }
            await Users.findByIdAndDelete(req.userId)
            return res.json({
                message: "User successfully deleted!"
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

const clearImage = (filePath)=>{
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, err=>{
        console.log(err);
    })
}