import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        // console.log(`Connected to MONGODB ${mongoose.connection.host}`);
    } catch (error) {
        // console.log(`MongoDb Error ${error}`)
    }
}
export default connectDB;