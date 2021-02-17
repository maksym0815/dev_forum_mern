const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.signup = async (req,res,next)=>{
    const {errors} = validationResult(req);
    if(errors.length>0){
        return res.status(404).json({
            error: errors[0].msg
        });
    }else{
        try{
            const doesUserExist = await User.find({email: req.body.email});
            if(doesUserExist.length>0){
                return res.status(403).json({
                    error: "User already exists!"
                });
            }else{
                const encryptedPassword = await bcrypt.hash(req.body.password, +process.env.SALT_ROUNDS);
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: encryptedPassword,
                });
                await user.save();
                return res.json({
                    message: "Signup successful!"
                });
            }
        }catch(error){
            return res.status(404).json({
                error: error
            });
        }
    }
 }

exports.login = async (req,res,next)=>{
    const {errors} = validationResult(req);
    if(errors.length>0){
        return res.status(404).json({
            error: errors[0].msg
        })
    }else{
        try{
            const user = await User.findOne({email: req.body.email});
            if(user){
                const passwordMatches = await bcrypt.compare(req.body.password, user.password);
                if(passwordMatches){
                    console.log(user)
                    const token = jwt.sign({
                        _id: user._id
                    }, process.env.JWT_SECRET);
                    res.cookie("token", token, {expire: new Date()+ 9999});
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
                    return res.status(400).json({
                        error: "Email and password do not match!"
                    });
                }
            }else{
                return res.status(400).json({
                    error: "User with that email does not match. Please signup!"
                });
            }
        }catch(error){
            return res.status(404).json({
                error: error
            });
        }
    }
}

exports.logout = (req,res,next)=>{
    res.clearCookie("token")
    return res.json({
        message: "Successfully logged out!"
    })
}