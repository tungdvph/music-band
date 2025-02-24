// src/app/controllers/BookingController.js
import Booking from '../models/Booking.js';
import Band from '../models/Band.js'; // Import nếu bạn muốn hiển thị thông tin band

export const index = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('band').populate('user'); // Populate cả band và user
        res.render('booking/index', { title: 'Đặt lịch', bookings });
    } catch (error) {
        console.error("Lỗi khi truy vấn danh sách đặt lịch:", error);
        res.status(500).render('error', { message: 'Lỗi khi tải trang đặt lịch.' });
    }
};

// Bạn có thể thêm các hàm khác như create, show, update, delete (nếu cần)
// Ví dụ:
/*
export const create = async (req, res) => {
  // Xử lý tạo booking mới (cần form ở view)
};
*/