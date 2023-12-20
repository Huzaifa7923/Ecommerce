import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js';
const port=process.env.PORT||5000;

import products from '../backend/data/products.js'

connectDB();
const app=express();

app.get('/',(req,res)=>{
    console.log("ckjcnkjdscnd")
    res.send('API IS RUNNING')
})

app.get('/api/products',(req,res)=>{
    res.json(products);
})

app.get('/api/products/:id',(req,res)=>{
    const product=products.find((p)=>p._id===req.params.id)
    res.json(product);
})

app.listen(port,()=>console.log(`server running on ${port}`))