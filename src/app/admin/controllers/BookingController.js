// src/app/admin/controllers/BookingController.js
import BookingService from '../services/BookingService.js'; // Sửa đường dẫn import
import { validationResult } from 'express-validator';
import Band from '../../models/Band.js'; // Sửa đường dẫn import

// Hiển thị danh sách booking (cho admin)
export const index = async (req, res, next) => { // Thêm next
    try {
        const bookings = await BookingService.getAllBookings();
        // console.log("Bookings:", bookings); // Xóa dòng này khi code đã chạy ổn
        res.render('booking/index', { title: 'Quản lý Đặt lịch', bookings: bookings, layout: 'admin' }); // Sửa đường dẫn
    } catch (error) {
        next(error); // Chuyển lỗi xuống middleware xử lý lỗi chung
    }
};

// Hiển thị form tạo mới booking (GET /admin/bookings/create)
export const create = async (req, res, next) => { // Thêm next
    try {
        const bands = await Band.find({}).lean(); // Lấy danh sách band
        res.render('booking/create', { title: 'Tạo Booking Mới', layout: 'admin', bands: bands });// Sửa đường dẫn
    } catch (error) {
        next(error); // Chuyển lỗi xuống middleware xử lý lỗi chung
    }
};

// Xử lý lưu booking mới (POST /admin/bookings)
export const store = async (req, res, next) => { // Thêm next
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        try {
            const bands = await Band.find({}).lean();
            return res.status(400).render('booking/create', { // Sửa đường dẫn
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
        const newBooking = await BookingService.createBooking(req.body);
        res.redirect('/admin/bookings');
    } catch (error) {
        next(error)
    }
};

//show - Hiển thị chi tiết booking
export const show = async (req, res, next) => { //them next
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy booking', layout: 'admin' }) //có thể chuyển hướng sang 1 trang thông báo lỗi.
        }
        res.render('booking/show', { title: 'Chi tiết đặt lịch', booking: booking, layout: 'admin' }) // Sửa đường dẫn
    } catch (error) {
        next(error)
    }
}

// Hiển thị form edit (cho admin)
export const edit = async (req, res, next) => { // Thêm next
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.render('booking/edit', { title: 'Chỉnh sửa đặt lịch', booking: booking, bands: bands, layout: 'admin' });// Sửa đường dẫn
    } catch (error) {
        next(error);
    }
};

// Cập nhật booking (cho admin)
export const update = async (req, res, next) => { // Thêm next
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const booking = await BookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        return res.status(400).render('booking/edit', { // Sửa đường dẫn
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
        next(error);
    }
};

// Hiển thị trang xác nhận xóa (cho admin)
export const confirmDelete = async (req, res, next) => {// Thêm next
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.render('booking/confirm-delete', { title: 'Xác nhận xóa', booking: booking, layout: 'admin' });// Sửa đường dẫn
    } catch (error) {
        next(error);
    }
};

// Xóa booking (cho admin)
export const destroy = async (req, res, next) => {// Thêm next
    try {
        const result = await BookingService.deleteBooking(req.params.id);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'admin' });
        }
        res.redirect('/admin/bookings'); // Chuyển hướng về trang danh sách bookings
    } catch (error) {
        next(error)
    }
};