import path from 'path'

import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js';
const port=process.env.PORT||5000;
import productRoutes from './routes/productRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import cookieParser from 'cookie-parser';

connectDB();
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

 
//TO GET CLIENT ID 
app.get('/api/config/paypal',(req,res)=>
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
)

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);

const __dirname=path.resolve();
// console.log(__dirname);
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    //if route is not present above then redirected to index.html
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}else{
    app.get('/',(req,res)=>{
        res.send('api is running')
    })
} 
// serve static files from the /uploads directory
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))

app.use(notFound)
app.use(errorHandler)




app.listen(port,()=>console.log(`server running on ${port}`))