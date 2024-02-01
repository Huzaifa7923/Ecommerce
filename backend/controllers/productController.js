import Product from "../models/productModel.js"
import asyncHandler from "../middleware/asyncHandler.js";


const getProducts=asyncHandler(async(req,res)=>{
    // console.log('ggg')
    
    const pageSize=process.env.PAGINATION_LIMIT;
    const page=Number(req.query.pageNumber) || 1;
    //  The query to our backend is constructed for us by using RTK Query.// So while we never actually write a request to /api/products?pageNumber=2// RTK Query constructs that url for us when we pass a params object to the Query

    const filter=req.query.keyword?{
        name:{
            $regex:req.query.keyword,//regular expression
            $options:'i'//case insenstive
        },
    }:{};

    const count=await Product.countDocuments({...filter});//mongoose mtd to count totalproducts

    const products=await Product.find({...filter})

    .limit(pageSize)//to limit size
    .skip(pageSize*(page-1)); // if on page 3 => skip products on first,second page 

    res.json({products,page,pages:Math.ceil(count/pageSize)});

})

const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product){
        return res.json(product);       
    }
    res.status(404)
    throw new Error('Resource not found')
})

const createProduct=asyncHandler(async(req,res)=>{
    const product=new Product({
        user:req.user._id,
        name:'sample name',
        image:'/images/sample.jpg',
        description:'sample description',
        price:100,
        brand:'sample brand',
        category:'sample category'
    })
    const createdProduct=await product.save();

    res.status(201).json(createdProduct)
})

const updateProduct=asyncHandler(async(req,res)=>{
    const {name,price,description,image,brand,category,countInStock}=req.body;
    console.log('velow')
    console.log(req.params.id);
    const product=await Product.findById(req.params.id);

    if(product){
        product.name=name||product.name,
        product.price=price||product.price,
        product.description=description||product.description,
        product.image=image||product.image,
        product.brand=brand||product.brand,
        product.category=category||product.category,
        product.countInStock=countInStock||product.countInStock

    const updatedProduct=await product.save();
    res.status(200).json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct=asyncHandler(async(req,res)=>{

    // await Product.deleteOne({_id:req.params.id});
    // res.json({ message: 'Product removed' });

    const product = await Product.findById(req.params.id);
    
    // console.log(req.params.id);
    // console.log(product._id);
    // console.log(product);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }  
})

// POST :/api/products/:id/reviews
const createProductReview=asyncHandler(async(req,res)=>{
    console.log('rrr')
    const {rating,comment} =req.body;
    console.log('---')
    console.log(req.params.id)
    const product=await Product.findById(req.params.id);
    
    if(product){
    const alreadyReviewed=product.reviews.find((r)=>r.user.toString()===req.user._id.toString())//have to do like this bcz reviewSchema cant use mongodb methods like findyId ,{findById implicitly convert id to objectId which is then searched}
    console.log('+++')
    console.log(req.user);

    if(alreadyReviewed){
        res.status(400);
        throw new Error('Product already reviewed')
    }

    console.log(req.user)

    const review={
        name:req.user.name,
        rating:Number(rating),
        comment,
        user:req.user._id
    }

    product.reviews.push(review);

    product.numReviews=product.reviews.length;

    product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length;

    await product.save();
    res.status(201).json({message:'Review added '})
}else{
    res.status(404)
    throw new Error('Product not found');
}
})

const topProducts=asyncHandler(async(req,res)=>{
    // console.log('top')
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
})



export {getProductById,getProducts,createProduct,updateProduct,deleteProduct,createProductReview,topProducts} 