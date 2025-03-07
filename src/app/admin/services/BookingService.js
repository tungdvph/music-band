// src/app/admin/services/BookingService.js
import Booking from '../../models/Booking.js';
import User from '../../models/User.js';

class BookingService {
    /**
     * Lấy tất cả các booking, populate thông tin band và user.
     * @returns {Promise<Array<Object>>} Mảng các booking đã được format.
     * @throws {Error} Nếu có lỗi xảy ra trong quá trình truy vấn.
     */
    async getAllBookings() {
        try {
            const bookings = await Booking.find({}).populate('band').populate('user').lean();

            // Format lại ngày tháng (quan trọng nếu bạn dùng trong view)
            const formattedBookings = bookings.map(booking => ({
                ...booking,
                date: booking.date ? new Date(booking.date) : null, // Chuyển đổi sang đối tượng Date
            }));

            return formattedBookings;
        } catch (error) {
            throw new Error('Lỗi khi lấy tất cả bookings: ' + error.message);
        }
    }

    /**
     * Đếm tổng số booking.
     * @returns {Promise<number>} Tổng số booking.
     * @throws {Error} Nếu có lỗi xảy ra.
     */
    async getTotalBookings() {
        try {
            const count = await Booking.countDocuments();
            return count;
        } catch (error) {
            throw new Error('Lỗi thống kê booking: ' + error.message);
        }
    }

    /**
     * Lấy một số lượng booking gần đây nhất.
     * @param {number} [limit=5] Số lượng booking tối đa muốn lấy. Mặc định là 5.
     * @returns {Promise<Array<Object>>} Mảng các booking gần đây.
     * @throws {Error}
     */
    async getRecentBookings(limit = 5) {
        try {
            const bookings = await Booking.find({})
                .sort({ createdAt: -1 }) // Sắp xếp theo thời gian tạo (mới nhất đầu tiên)
                .limit(limit)
                .populate('user') // Populate thông tin user
                .lean();
            return bookings;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách booking gần đây: ' + error.message);
        }
    }

    /**
     * Tạo một booking mới.
     * @param {Object} bookingData Dữ liệu của booking.
     * @returns {Promise<Object>} Booking vừa tạo.
     * @throws {Error}
     */
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

    /**
     * Lấy thông tin chi tiết của một booking.
     * @param {string} id ID của booking.
     * @returns {Promise<Object|null>} Thông tin booking, hoặc null nếu không tìm thấy.
     * @throws {Error}
     */
    async getBookingById(id) {
        try {
            const booking = await Booking.findById(id).populate('band').populate('user').lean();
            return booking;
        } catch (error) {
            console.error("Lỗi khi lấy booking:", error);
            throw new Error("Lỗi khi lấy booking: " + error.message);
        }
    }

    /**
     * Cập nhật thông tin của một booking.
     * @param {string} id ID của booking.
     * @param {Object} updateData Dữ liệu cập nhật.
     * @returns {Promise<Object|null>} Thông tin booking sau khi cập nhật, hoặc null nếu không tìm thấy.
     * @throws {Error}
     */
    async updateBooking(id, updateData) {
        try {
            const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true }) // { new: true } để trả về bản ghi sau khi update
                .populate('band')
                .populate('user')
                .lean();
            return booking;
        } catch (error) {
            console.error("Lỗi khi cập nhật booking", error);
            throw new Error("Lỗi khi cập nhật booking: " + error.message);
        }
    }

    /**
     * Xóa một booking.
     * @param {string} id ID của booking cần xóa.
     * @returns {Promise<Object|null>} Kết quả xóa, hoặc null nếu không tìm thấy.
     * @throws {Error}
     */
    async deleteBooking(id) {
        try {
            const result = await Booking.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.error("Lỗi khi xóa booking:", error);
            throw new Error("Lỗi khi xóa booking: " + error.message);
        }
    }

    /**
     * Tính doanh thu theo tháng trong một năm cụ thể.
     * @param {number} year Năm cần tính doanh thu.
     * @returns {Promise<Array<number>>} Mảng 12 phần tử, mỗi phần tử là doanh thu của tháng tương ứng.
     * @throws {Error}
     */
    static async getRevenueByMonth(year) { // Phương thức static
        try {
            const result = await Booking.aggregate([
                {
                    $match: {
                        bookingDate: { // Đổi thành bookingDate cho đúng với model
                            $gte: new Date(year, 0, 1),         // Lớn hơn hoặc bằng ngày 1 tháng 1 của năm
                            $lt: new Date(year + 1, 0, 1)       // Nhỏ hơn ngày 1 tháng 1 của năm sau
                        },
                        status: { $ne: 'cancelled' }             // Không tính các booking đã hủy
                    }
                },
                {
                    $group: {
                        _id: { $month: "$bookingDate" }, // Nhóm theo tháng của bookingDate
                        totalRevenue: { $sum: { $multiply: ["$duration", "$budget"] } } // Tính tổng doanh thu = duration * budget
                    }
                },
                {
                    $sort: { "_id": 1 } // Sắp xếp theo tháng tăng dần
                }
            ]);

            // Tạo mảng 12 phần tử, mặc định là 0
            const revenueData = Array(12).fill(0);
            // Điền doanh thu vào đúng tháng
            result.forEach(item => {
                revenueData[item._id - 1] = item.totalRevenue; // Tháng trong MongoDB từ 1-12, nên phải trừ 1
            });

            return revenueData;
        } catch (error) {
            throw new Error('Lỗi khi lấy doanh thu theo tháng: ' + error.message);
        }
    }

    /**
     * Đếm số lượng booking theo từng trạng thái.
     * @returns {Promise<Object>} Đối tượng chứa số lượng booking theo trạng thái. Ví dụ: { booked: 5, confirmed: 3, completed: 2, cancelled: 1 }
     * @throws {Error}
     */
    async getBookingStatusCounts() { // Phương thức instance (không static)
        try {
            const result = await Booking.aggregate([
                {
                    $group: {
                        _id: "$status", // Nhóm theo trường status
                        count: { $sum: 1 } // Đếm số lượng
                    }
                }
            ]);

            // Tạo đối tượng để lưu trữ kết quả
            const statusCounts = {};
            result.forEach(item => {
                statusCounts[item._id] = item.count;
            });

            // Đảm bảo tất cả các trạng thái đều có, kể cả khi count = 0
            const allStatusCounts = {
                'booked': 0,
                'confirmed': 0,
                'completed': 0,
                'cancelled': 0
            };

            // Gộp kết quả từ aggregation vào allStatusCounts
            for (const status in statusCounts) {
                if (allStatusCounts.hasOwnProperty(status)) { // Kiểm tra xem status có trong allStatusCounts không
                    allStatusCounts[status] = statusCounts[status];
                }
            }
            return allStatusCounts;

        } catch (error) {
            throw new Error('Lỗi khi lấy số lượng booking theo trạng thái: ' + error.message);
        }
    }
}

export default BookingService; // Export class