// src/app/admin/controllers/BookingController.js
import BookingService from '../services/BookingService.js';
import { validationResult } from 'express-validator';
import Band from '../../models/Band.js';

// Hiển thị danh sách booking (cho admin)
export const index = async (req, res, next) => {
    try {
        const bookingService = new BookingService(); // Tạo instance
        const bookings = await bookingService.getAllBookings();
        res.render('booking/index', { title: 'Quản lý Đặt lịch', bookings: bookings, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

// Hiển thị form tạo mới booking
export const create = async (req, res, next) => {
    try {
        const bands = await Band.find({}).lean();
        res.render('booking/create', { title: 'Tạo Booking Mới', layout: 'admin', bands: bands });
    } catch (error) {
        next(error);
    }
};

// Xử lý lưu booking mới
export const store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        try {
            const bands = await Band.find({}).lean();
            return res.status(400).render('booking/create', {
                title: 'Tạo Booking Mới',
                errors: errors.array(),
                booking: req.body,
                bands: bands,
                layout: 'admin'
            });

        } catch (error) {
            next(error)
        }
    }

    try {
        const bookingService = new BookingService(); // Tạo instance
        const newBooking = await bookingService.createBooking(req.body);
        res.redirect('/admin/bookings');
    } catch (error) {
        next(error)
    }
};

// Hiển thị chi tiết booking
export const show = async (req, res, next) => {
    try {
        const bookingService = new BookingService(); // Tạo instance
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy booking', layout: 'admin' })
        }
        res.render('booking/show', { title: 'Chi tiết đặt lịch', booking: booking, layout: 'admin' })
    } catch (error) {
        next(error)
    }
}

// Hiển thị form edit
export const edit = async (req, res, next) => {
    try {
        const bookingService = new BookingService(); // Tạo instance
        const booking = await bookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.render('booking/edit', { title: 'Chỉnh sửa đặt lịch', booking: booking, bands: bands, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

// Cập nhật booking
export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const bookingService = new BookingService(); // Tạo instance
        const booking = await bookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        return res.status(400).render('booking/edit', {
            title: 'Chỉnh sửa đặt lịch',
            errors: errors.array(),
            booking: booking,
            bands: bands,
            layout: 'admin'
        });
    }

    try {
        const bookingService = new BookingService(); // Tạo instance
        const updatedBooking = await bookingService.updateBooking(req.params.id, req.body);
        if (!updatedBooking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.redirect('/admin/bookings');
    } catch (error) {
        next(error);
    }
};

// Hiển thị trang xác nhận xóa
export const confirmDelete = async (req, res, next) => {
    try {
        const bookingService = new BookingService(); // Tạo instance
        const booking = await bookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.render('booking/confirm-delete', { title: 'Xác nhận xóa', booking: booking, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

// Xóa booking
export const destroy = async (req, res, next) => {
    try {
        const bookingService = new BookingService(); // Tạo instance
        const result = await bookingService.deleteBooking(req.params.id);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.redirect('/admin/bookings');
    } catch (error) {
        next(error)
    }
};

// Xử lý lưu booking mới (cho CLIENT)
export const createBooking = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const bookingService = new BookingService(); // Tạo instance
        const newBooking = await bookingService.createBooking(req.body);
        res.status(201).json({ message: 'Đặt lịch thành công!', booking: newBooking });
    } catch (error) {
        next(error);
    }
};