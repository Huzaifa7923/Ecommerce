import mongoose from "mongoose";
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import users from './data/users.js'

dotenv.config();
connectDB();



const importData = async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser=await User.insertMany(users);
        const adminUser=createdUser[0]._id;

        const sampleProducts=products.map((product)=>{
            return {...product,user:adminUser}
        })

        await Product.insertMany(sampleProducts);

        console.log('data imported');
        process.exit();

    }catch(e){
        console.log(e);
        process.exit(1);
    }
}
const destroyData = async () => {
    try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
  
      console.log('Data Destroyed!');
      process.exit();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

  //arguments passed in terminal 
  // node backend/seeder -d -h -xxx
  //                      2  3   4
  //0th & 1st index=> paths 
  if(process.argv[2]==='-d'){
    destroyData();
  }else{
    importData();
  }
