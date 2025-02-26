// src/app/adminControllers/BookingController.js (Nếu bạn chuyển BookingController)
import BookingService from '../services/BookingService.js';
import { validationResult } from 'express-validator';
import Band from '../models/Band.js';
// import User from '../models/User.js'; // Có thể không cần trong admin, tùy vào logic

// Hiển thị danh sách booking (cho admin)
export const index = async (req, res) => {
    try {
        const bookings = await BookingService.getAllBookings();
        res.render('admin/bookings/index', { title: 'Quản lý Đặt lịch', bookings: bookings });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi khi tải danh sách đặt lịch.' });
    }
};

//show - Hiển thị chi tiết booking
export const show = async (req, res) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy booking' })
        }
        res.render('admin/bookings/show', { title: 'Chi tiết đặt lịch', booking: booking })
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || 'Lỗi Server' })
    }
}

// Hiển thị form edit (cho admin)
export const edit = async (req, res) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch' });
        }
        res.render('admin/bookings/edit', { title: 'Chỉnh sửa đặt lịch', booking: booking, bands: bands });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: "Lỗi Server" })
    }
};

// Cập nhật booking (cho admin)
export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const booking = await BookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        return res.status(400).render('admin/bookings/edit', {
            title: 'Chỉnh sửa đặt lịch',
            errors: errors.array(),
            booking: booking,
            bands: bands
        });
    }

    try {
        const updatedBooking = await BookingService.updateBooking(req.params.id, req.body);
        if (!updatedBooking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch' });
        }
        res.redirect('/admin/bookings'); // Chuyển hướng về trang danh sách bookings (trong admin)
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server' });
    }
};

// Hiển thị trang xác nhận xóa (cho admin)
export const confirmDelete = async (req, res) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch' });
        }
        res.render('admin/bookings/confirm-delete', { title: 'Xác nhận xóa', booking: booking });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server' });
    }
};

// Xóa booking (cho admin)
export const destroy = async (req, res) => {
    try {
        const result = await BookingService.deleteBooking(req.params.id);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch' });
        }
        res.redirect('/admin/bookings'); // Chuyển hướng về trang danh sách bookings
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server' });
    }
};