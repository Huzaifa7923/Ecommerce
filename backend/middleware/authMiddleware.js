import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from 'jsonwebtoken'

const protect=asyncHandler(async(req,res,next)=>{

    let token=req.cookies.jwt;

    if(token){
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            // console.log(decoded);
            req.user=await User.findById(decoded.userId).select('-password')
            next();
        }catch(err){
            res.status(401)
            throw new Error('token found but invalid')
        }
    }else{
        res.status(401)
        throw new Error('token not found')
    }
})

// admin middleware

const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
    res.status(401);
    throw new Error('Not authorised as admin');
    }
}

export {admin,protect}