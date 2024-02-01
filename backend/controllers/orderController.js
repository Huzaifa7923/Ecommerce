import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/orderModel.js"
import Product from '../models/productModel.js'
import {calcPrices} from '../utils/calcPrices.js'

const addOrderItem=asyncHandler(async(req,res)=>{

    const {cartItems,shippingAddress,paymentMethod}=req.body;

    // console.log(cartItems)
    // console.log(shippingAddress)
    // console.log(paymentMethod)

    if(cartItems && cartItems.length===0){
        res.status(400)
        throw new Error('No ordered items!')
    }else{
        //Array of products 
        const itemsFromDB=await Product.find({
            _id:{$in: cartItems.map((x)=>x._id)} //mongodbQuery: https://www.mongodb.com/docs/manual/tutorial/query-documents/
        })

        // console.log('items from database using query : '+itemsFromDB);

        const dbOrderItems=cartItems.map((itemFromClient)=>{
            const matched=itemsFromDB.find(itemfromDB=>
                itemFromClient._id===itemfromDB._id.toString()
            )
            return{
                ...itemFromClient,
                product:itemFromClient._id,
                price:matched.price,
                _id:undefined
            }
        })

        const {itemsPrice,taxPrice,shippingPrice,totalPrice}=calcPrices(dbOrderItems);

        const order=new Order({
        orderItems:dbOrderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })

    const createdOrder=await order.save()

    res.status(201)
    res.json(createdOrder);
}})

const getMyOrder=asyncHandler(async(req,res)=>{
    const orders=await Order.find({user:req.user._id})
    res.status(201).json(orders);
    
})

const getOrderById=asyncHandler(async(req,res)=>{

    const order= await Order.findById(req.params.id).populate('user','name email')

    if(order){
        res.status(201).json(order)
    }else{
        res.status(404);
        throw new Error('Order not found');
    }
})

const getOrders=asyncHandler(async(req,res)=>{
    const order=await Order.find().populate('user').select('-password');
    // console.log(order);
    res.status(200).json(order);
})

const updateOrderToPaid=asyncHandler(async(req,res)=>{
    // console.log('....Wweqewq'+req.params.id)
    const order=await Order.findById(req.params.id);

    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.email_address,
        }

        const updatedOrder=await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//admin PUT /api/orders/:id/deliver
const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id);
    if(order){
        order.isDelivered=true;
        order.deliveredAt=Date.now();

        const updatedOrder=await order.save();

        res.json(updatedOrder);
    }else{
        res.status(404)
        throw new Error('Order not found ')
    }
})

export {
    addOrderItem,
    getMyOrder,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid}

