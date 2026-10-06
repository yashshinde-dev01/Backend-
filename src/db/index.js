import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";


const connectDB=async ()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MngoDb connected !! db host: ${connectionInstance.connection.host}`);
    }catch(err){
        console.log('mongodb connection error',err);
        process.exit(1)
    }
}

export default connectDB;