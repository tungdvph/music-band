import Schedule from '../../models/Schedule.js';

class ScheduleService { // Đã sửa tên class
  async getUpcomingSchedules() {
    try {
      const now = new Date();
      const schedules = await Schedule.find({ date: { $gte: now } }) // Lấy các lịch trình có ngày >= hiện tại
        .sort({ date: 1 }) // Sắp xếp theo ngày tăng dần (gần nhất lên trên)
        .populate('band') // Nếu bạn muốn hiển thị thông tin ban nhạc
        .lean();
      return schedules;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách lịch trình: ' + error.message);
    }
  }
  async getScheduleBySlug(slug) {
    try {
      const schedule = await Schedule.findOne({ slug: slug }).populate('band').lean();
      return schedule;
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin lịch trình: ' + error.message)
    }
  }

  // Có thể thêm các phương thức khác, ví dụ: getSchedulesByMonth(year, month)
}

export default new ScheduleService(); // Đã sửa tên class khi export