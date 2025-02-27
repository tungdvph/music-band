// src/app/adminControllers/BookingController.js
import BookingService from '../services/BookingService.js';
import { validationResult } from 'express-validator';
import Band from '../models/Band.js';

// Hiển thị danh sách booking (cho admin)
export const index = async (req, res) => {
    try {
        const bookings = await BookingService.getAllBookings();
        console.log("Bookings:", bookings); // Kiểm tra dữ liệu bookings
        res.render('admin/bookings/index', { title: 'Quản lý Đặt lịch', bookings: bookings, layout: 'admin' });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi khi tải danh sách đặt lịch.', layout: 'admin' });
    }
};


// Hiển thị form tạo mới booking (GET /admin/bookings/create)
export const create = async (req, res) => {
    try {
        const bands = await Band.find({}).lean(); // Lấy danh sách band
        res.render('admin/bookings/create', { title: 'Tạo Booking Mới', layout: 'admin', bands: bands });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi khi tải form tạo booking.', layout: 'admin' });
    }
};

// Xử lý lưu booking mới (POST /admin/bookings)
export const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const bands = await Band.find({}).lean();
        return res.status(400).render('admin/bookings/create', {
            title: 'Tạo Booking Mới',
            errors: errors.array(),
            booking: req.body,
            bands: bands,
            layout: 'admin'
        });
    }

    try {
        const newBooking = await BookingService.createBooking(req.body);
        res.redirect('/admin/bookings');
    } catch (error) {
        console.error(error);
        const bands = await Band.find({}).lean();
        res.status(500).render('admin/bookings/create', {
            title: 'Tạo Booking Mới',
            booking: req.body,
            bands: bands,
            errors: [{ msg: error.message || 'Lỗi server' }],
            layout: 'admin',
        });
    }
};

//show - Hiển thị chi tiết booking
export const show = async (req, res) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy booking', layout: 'admin' })
        }
        res.render('admin/bookings/show', { title: 'Chi tiết đặt lịch', booking: booking, layout: 'admin' })
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || 'Lỗi Server', layout: 'admin' })
    }
}

// Hiển thị form edit (cho admin)
export const edit = async (req, res) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.render('admin/bookings/edit', { title: 'Chỉnh sửa đặt lịch', booking: booking, bands: bands, layout: 'admin' });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: "Lỗi Server", layout: 'admin' })
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
            bands: bands,
            layout: 'admin'
        });
    }

    try {
        const updatedBooking = await BookingService.updateBooking(req.params.id, req.body);
        if (!updatedBooking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.redirect('/admin/bookings'); // Chuyển hướng về trang danh sách bookings (trong admin)
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
    }
};

// Hiển thị trang xác nhận xóa (cho admin)
export const confirmDelete = async (req, res) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.render('admin/bookings/confirm-delete', { title: 'Xác nhận xóa', booking: booking, layout: 'admin' });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
    }
};

// Xóa booking (cho admin)
export const destroy = async (req, res) => {
    try {
        const result = await BookingService.deleteBooking(req.params.id);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.redirect('/admin/bookings'); // Chuyển hướng về trang danh sách bookings
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
    }
};