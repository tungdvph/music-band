// src/app/site/controllers/BookingController.js
import BookingService from '../services/SiteBookingService.js';
import { validationResult } from 'express-validator';
import Band from '../../models/Band.js';
import moment from 'moment'; // Thêm import moment


// Hiển thị form tạo booking (GET /booking/create)
export const create = async (req, res, next) => { // Thêm next vào tất cả
    try {
        const bands = await Band.find({}).lean();
        res.render('booking/create', { title: 'Đặt lịch biểu diễn', bands: bands }); // Sửa đường dẫn view
    } catch (error) {
        next(error)
    }

};

// Xử lý dữ liệu từ form tạo booking (POST /booking)
export const store = async (req, res, next) => { // Thêm 'next'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        try {
            const bands = await Band.find({}).lean();
            return res.status(400).render('booking/create', { // Sửa đường dẫn view
                title: 'Đặt lịch biểu diễn',
                errors: errors.array(),
                booking: req.body,
                bands: bands
            });
        } catch (error) {
            next(error)
        }
    }

    try {
        const newBooking = await BookingService.createBooking(req.body);
        res.redirect('/booking/' + newBooking._id);  // Chuyển hướng đến trang chi tiết booking
    } catch (error) {
        next(error); // Chuyển lỗi cho middleware
    }
};

//show
export const show = async (req, res, next) => { //them next
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy booking', layout: 'default' }) //có thể chuyển hướng sang 1 trang thông báo lỗi.  Thêm layout
        }

        // Định dạng ngày tháng TRƯỚC KHI render
        if (booking.date) {
            booking.date = moment(booking.date).format('DD/MM/YYYY'); // Hoặc định dạng khác
        }

        res.render('booking/show', { title: 'Chi tiết đặt lịch', booking: booking, layout: 'default' }) // Sửa đường dẫn view, thêm layout
    } catch (error) {
        next(error)
    }
};

// Thiếu các hàm edit, update, confirmDelete, destroy. Thêm nếu cần

// Hiển thị form edit (cho site)
export const edit = async (req, res, next) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        const bands = await Band.find({}).lean();
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'default' });
        }

        // ĐỊNH DẠNG NGÀY THÁNG CHO INPUT TYPE="DATE"
        if (booking.date) {
            booking.date = moment(booking.date).format('YYYY-MM-DD');
        }

        res.render('booking/edit', { title: 'Chỉnh sửa đặt lịch', booking: booking, bands: bands, layout: 'default' });
    } catch (error) {
        next(error)
    }
};

// Cập nhật booking (cho site)
export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        try {
            const booking = await BookingService.getBookingById(req.params.id);
            const bands = await Band.find({}).lean();
            return res.status(400).render('booking/edit', {
                title: 'Chỉnh sửa đặt lịch',
                errors: errors.array(),
                booking: booking,
                bands: bands,
                layout: 'default'
            });
        } catch (error) {
            next(error);
        }
    }

    try {
        const updatedBooking = await BookingService.updateBooking(req.params.id, req.body);
        if (!updatedBooking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'default' });
        }
        res.redirect('/booking/' + updatedBooking._id); // Chuyển hướng về trang chi tiết bookings (trong site)
    } catch (error) {
        next(error);
    }
};
// Hiển thị trang xác nhận xóa (cho site)
export const confirmDelete = async (req, res, next) => {
    try {
        const booking = await BookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'default' });
        }
        // Định dạng ngày tháng
        if (booking.date) {
            booking.date = moment(booking.date).format('DD/MM/YYYY'); // Hoặc định dạng khác
        }
        res.render('booking/confirm-delete', { title: 'Xác nhận xóa', booking: booking, layout: 'default' });
    } catch (error) {
        next(error)
    }
}

// Xóa booking (cho site)
export const destroy = async (req, res, next) => {
    try {
        const result = await BookingService.deleteBooking(req.params.id);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy đặt lịch', layout: 'default' });
        }
        res.redirect('/booking'); // Chuyển hướng về trang danh sách bookings
    } catch (error) {
        next(error)
    }
}
// thêm index
export const index = async (req, res, next) => {
    try {
        const bookings = await BookingService.getAllBookings();
        const formattedBookings = bookings.map(booking => {
            if (booking.date) {
                return {
                    ...booking,
                    date: moment(booking.date).format('DD/MM/YYYY') // Hoặc định dạng bạn muốn
                }
            }
            return booking;
        });
        res.render('booking/index', { title: "Danh sách đặt lịch", bookings: formattedBookings, layout: 'default' })
    } catch (error) {
        next(error)
    }
}