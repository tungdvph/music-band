// src/config/db/index.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Tải biến môi trường từ .env

async function connect() {
    try {
        // Lấy chuỗi kết nối từ biến môi trường.
        const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database_name'; // phương án dự phòng
        await mongoose.connect(dbUrl); // Đã xóa useNewUrlParser và useUnifiedTopology
        console.log('Kết nối MongoDB thành công!');
    } catch (error) {
        console.error('Kết nối MongoDB thất bại:', error);
        process.exit(1); // Thoát ứng dụng nếu không kết nối được.
    }
}

export default { connect };