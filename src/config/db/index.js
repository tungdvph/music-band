// src/config/db/index.js
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Gọi dotenv.config() để load biến môi trường từ .env

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // Các options này không còn cần thiết trong Mongoose 6+
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('Connect to MongoDB successfully!');
    } catch (error) {
        console.error('Connect to MongoDB failed:', error);
    }
}

export default { connect };