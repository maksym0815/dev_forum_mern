const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req,res,next)=>{
    try{
        const {errors} = validationResult(req);
        if(errors.length>0){
            const error = new Error(errors[0].msg);
            error.statusCode = 422;
            error.data = "Validation failed!";
            throw error;
        }
        const doesUserExist = await User.find({email: req.body.email});
        if(doesUserExist.length>0){
            const error = new Error("User already exists!");
            error.statusCode = 409;
            error.data = "User already exists!";
            throw error;
        }
        const encryptedPassword = await bcrypt.hash(req.body.password, +process.env.SALT_ROUNDS);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword,
        });
        const result = await user.save();
        return res.json({
            userId: result._id,
            message: "Registered successfully!"
        });
    }catch(error){
        if(!error.statusCode){
            error.statusCode=500;
        }
        next(error);
    }
 }

exports.login = async (req,res,next)=>{
    try{
        const {errors} = validationResult(req);
        if(errors.length>0){
            const error = new Error(errors[0].msg);
            error.statusCode = 422;
            error.data = "Validation failed!";
            throw error;
        }
        const user = await User.findOne({email: req.body.email});
        if(user){
            const passwordMatches = await bcrypt.compare(req.body.password, user.password);
            if(passwordMatches){
                console.log(user)
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, process.env.JWT_SECRET, {expiresIn: "6h"});
                res.cookie("token", token, {expire: new Date()+ 21600});
                return res.status(200).json({
                    user: {
                        _id: user._id,
                        email: user.email,
                        username: user.username
                    },
                    token: token,
                    message: "Logged in successfully!"
                });
            }else{
                const error = new Error("Email and password do not match.");
                error.statusCode=400;
                error.data="Email and password do not match.";
                throw error;
            }
        }else{
            const error = new Error("User with that email does not exist. Please signup!");
                error.statusCode=400;
                error.data="User with that email does not exist. Please signup!";
                throw error;
        }
    }catch(error){
        if(!error.statusCode){
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.logout = (req,res,next)=>{
    res.clearCookie("token")
    return res.json({
        message: "Successfully logged out!"
    })
}