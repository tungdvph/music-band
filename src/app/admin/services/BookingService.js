// src/app/admin/services/BookingService.js
import Booking from '../../models/Booking.js';
import User from '../../models/User.js';

class BookingService {
    async getAllBookings() {
        try {
            const bookings = await Booking.find({}).populate('band').populate('user').lean();

            const formattedBookings = bookings.map(booking => ({
                ...booking,
                date: booking.date ? new Date(booking.date) : null, // Quan trọng!
            }));

            return formattedBookings;
        } catch (error) {
            // ... xử lý lỗi ...
        }
    }

    async getTotalBookings() {
        try {
            const count = await Booking.countDocuments();
            return count;
        } catch (error) {
            throw new Error('Lỗi thống kê booking' + error.message)
        }
    }
    async getRecentBookings(limit = 5) { // Lấy 5 booking gần đây nhất (mặc định)
        try {
            const bookings = await Booking.find({})
                .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo mới nhất
                .limit(limit)
                .lean();
            return bookings;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách booking gần đây: ' + error.message);
        }
    }

    async createBooking(bookingData) {
        try {
            const newBooking = new Booking(bookingData);
            await newBooking.save();
            return newBooking;
        } catch (error) {
            console.error("Lỗi khi tạo booking:", error);
            throw new Error("Lỗi khi tạo booking: " + error.message);
        }
    }

    async getBookingById(id) {
        try {
            const booking = await Booking.findById(id).populate('band').populate('user').lean();
            return booking;
        } catch (error) {
            console.error("Lỗi khi lấy booking:", error);
            throw new Error("Lỗi khi lấy booking: " + error.message)
        }
    }

    async updateBooking(id, updateData) {
        try {
            const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true }).populate('band').populate('user').lean();
            return booking;
        } catch (error) {
            console.error("Lỗi khi cập nhật booking", error);
            throw new Error("Lỗi khi cập nhật booking: " + error.message)
        }
    }

    async deleteBooking(id) {
        try {
            const result = await Booking.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Lỗi khi xóa booking:", error);
            throw new Error("Lỗi khi xóa booking: " + error.message);
        }
    }

}

export default new BookingService();