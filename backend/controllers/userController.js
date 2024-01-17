import User from '../models/userModel.js'
import asyncHandler from '../middleware/asyncHandler.js';
//login
import generateToken from '../utils/generateToken.js';

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});

    if(user&&await user.matchPassword(password)){

        generateToken(res,user._id);

        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const logoutUser=(req,res)=>{
    
    res.cookie('jwt','',{
        httpOnly:true,
        maxAge:new Date(0)
    })
    res.status(200)
    res.json({message:"Logout successfully"})
}

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    const existedUser=await User.findOne({email})
    if(existedUser){
        res.status(400);
        throw new Error('Yser already exists')
    }

    const user=await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res,user._id);

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})



const getUserProfile=asyncHandler( async(req,res)=>{

    const user=await User.findById(req.user._id);//as saved in token in payload area

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }

})

const updateUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user){
        user.name=req.body.name||user.name
        user.email=req.body.email||user.email

        if(req.body.password){
            user.password=req.body.password;
        }
    const updatdeUser=await User.save();

    res.status(200).json({
        _id:updatdeUser._id,
        name:updatdeUser.name,
        email:updatdeUser.email,
        isAdmin:updatdeUser.isAdmin,
    })
}else{
    res.status(404)
    throw new Error('User not found')
}
})

//ADMIN 
const getUsers=(req,res)=>{
    res.send('ALL USERS BY ADMIN')
}
const deleteUser=(req,res)=>{
    res.send('delete USER BY ADMIN')
}
const getUserById=(req,res)=>{
    res.send('get USER by id BY ADMIN')
}
const updateUser=(req,res)=>{
    res.send('update user BY ADMIN')
}

export {loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,}
