const Users = require("../models/user");
const _ = require("lodash")

exports.getUsers = async(req,res, next)=>{
    try{
        const users = await Users.find().select("_id email username")
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
        const user = await Users.findById(req.params.userId).select("_id email username creationDate updatedDate")
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
        const user = await Users.findById(req.params.userId)
        console.log(req.userId, user._id)
        if(req.userId == user._id){
            _.extend(user, req.body);
            user.updatedDate = Date.now()
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