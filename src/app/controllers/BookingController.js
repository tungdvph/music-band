// src/app/controllers/BookingController.js
import BookingService from '../services/BookingService.js'; // Import the INSTANCE
import { validationResult } from 'express-validator';
import Band from '../models/Band.js';
import User from '../models/User.js';

// ... rest of your controller code ...
export const index = async (req, res) => {
    try {
        const bookings = await BookingService.getAllBookings();
        res.render('booking/index', { title: 'Danh sách đặt lịch', bookings: bookings });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi khi tải danh sách đặt lịch.' });
    }
};

// Hiển thị form tạo booking
export const create = async (req, res) => {
    const bands = await Band.find({}).lean();
    res.render('booking/create', { title: 'Đặt lịch biểu diễn', bands: bands });
};

// Xử lý dữ liệu từ form tạo booking (POST)
export const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const bands = await Band.find({}).lean();
        return res.status(400).render('booking/create', {
            title: 'Đặt lịch biểu diễn',
            errors: errors.array(),
            booking: req.body, // Gửi lại dữ liệu đã nhập để người dùng không phải nhập lại
            bands: bands
        });
    }

    try {
        const newBooking = await BookingService.createBooking(req.body);
        res.redirect('/booking');  // Hoặc chuyển hướng đến trang xác nhận, cảm ơn
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi khi đặt lịch.' });
    }
};

//show
export const show = async (req, res) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy booking' })
        }
        res.render('booking/show', { title: 'Chi tiết đặt lịch', booking: booking })
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || 'Lỗi Server' })
    }
}

// Hiển thị form edit
export const edit = async (req, res) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch' });
        }

        res.render('booking/edit', { title: 'Chỉnh sửa đặt lịch', booking: booking, bands: bands });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: "Lỗi Server" })
    }
}

// Cập nhật
export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const booking = await BookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        return res.status(400).render('booking/edit', {
            title: 'Chỉnh sửa đặt lịch',
            errors: errors.array(),
            booking: booking,
            bands: bands
        });
    }
    try {
        const updateBooking = await BookingService.updateBooking(req.params.id, req.body);
        if (!updateBooking) {
            return res.status(404).render('error', { message: "Không tìm thấy đặt lịch" })
        }
        res.redirect(`/booking/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: "Lỗi Server" })
    }
}
// Xác nhận xoá
export const confirmDelete = async (req, res) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);

        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch' });
        }

        res.render('booking/confirm-delete', { title: 'Xác nhận xóa', booking: booking });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server' });
    }
}
// Xoá
export const destroy = async (req, res) => {
    try {
        const result = await BookingService.deleteBooking(req.params.id);
        if (!result) {
            return res.status(404).render('error', { message: "Không tìm thấy đặt lịch" })
        }
        res.redirect('/booking')
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: "Lỗi Server" })
    }
}