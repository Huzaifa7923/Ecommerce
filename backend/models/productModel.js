import mongoose from "mongoose";

const reviewSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    comment:{
        type:String,
        required:true
    },
},{
    timestamps:true
})
const productSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    reviews:[reviewSchema], 
},{
    timestamps:true
})

const Product = mongoose.model("product", productSchema);

export default Product;