// src/app/site/services/SiteBookingService.js
import Booking from '../../models/Booking.js';

class SiteBookingService {
    async createBooking(bookingData) {
        try {
            const newBooking = new Booking(bookingData);
            await newBooking.save();
            return newBooking.toObject();
        } catch (error) {
            // Bạn có thể xử lý lỗi cụ thể hơn (ví dụ: lỗi validation)
            throw new Error('Lỗi khi đặt lịch: ' + error.message);
        }
    }

    async getUserBookings(userId) { // Tùy chọn: Lấy lịch sử booking của user
        try {
            const bookings = await Booking.find({ user: userId }).populate('band').lean();
            return bookings;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách đặt lịch: ' + error.message);
        }
    }
    //có thể thêm method findBookingByDate nếu cần

    async getBookingById(id) {
        try {
            // populate để lấy thông tin của band, nếu cần.
            const booking = await Booking.findById(id).populate('band').lean();
            return booking;
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin đặt lịch: ' + error.message);
        }
    }
}

export default new SiteBookingService();