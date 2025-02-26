// src/app/services/BookingService.js
import Booking from '../models/Booking.js'; // Sử dụng phần mở rộng .js
import User from '../models/User.js';    // Sử dụng phần mở rộng .js và import

class BookingService {
    async getAllBookings() {
        try {
            // QUAN TRỌNG: Populate trường 'band' nếu bạn muốn bao gồm chi tiết ban nhạc
            const bookings = await Booking.find({}).populate('band').populate('user').lean();
            return bookings;

        } catch (error) {
            console.error("Lỗi khi lấy danh sách booking:", error);
            throw new Error("Lỗi khi lấy danh sách booking: " + error.message);
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

export default new BookingService(); // Xuất một THỂ HIỆN của service