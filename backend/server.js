import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js';
const port=process.env.PORT||5000;
import productRoutes from './routes/productRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';

connectDB();
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send('api is running')
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);

app.use(notFound)
app.use(errorHandler)




app.listen(port,()=>console.log(`server running on ${port}`))