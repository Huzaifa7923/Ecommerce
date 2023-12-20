import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongodb connect on ${conn.connection.host}`)
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}

export default connectDB