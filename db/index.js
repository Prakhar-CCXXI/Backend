import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
// import connectDB from "./db";

// import dotenv from 'dotenv';

// dotenv.config({ path: './env'})

const connectDB = async() => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    
    
  } catch (error) {
 
    console.log("MongoDB connection ", error);
    process.exit(1)
  }
}

export default connectDB