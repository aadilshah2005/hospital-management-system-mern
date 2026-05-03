import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connection successfully");
    } catch (error) {
        console.log(error);
        console.log("Database connection failed");
        process.exit(1)
    }
}