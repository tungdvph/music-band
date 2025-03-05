// src/app/services/ScheduleService.js
import Schedule from '../../models/Schedule.js';

class ScheduleService {
  async getAllSchedules() {
    try {
      const schedules = await Schedule.find({}).lean();
      return schedules;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách lịch trình: ' + error.message);
    }
  }

  async getScheduleBySlug(slug) { // Đã có sẵn hàm này
    try {
      const schedule = await Schedule.findOne({ slug }).lean();
      return schedule;
    } catch (error) {
      throw new Error('Lỗi khi lấy thông tin lịch trình: ' + error.message);
    }
  }

  async createSchedule(scheduleData) {
    try {
      const newSchedule = await Schedule.create(scheduleData);
      return newSchedule;
    } catch (error) {
      throw new Error('Lỗi khi tạo lịch trình: ' + error.message);
    }
  }
  async updateSchedule(slug, updatedData) {
    try {
      const updateSchedule = await Schedule.findOneAndUpdate({ slug: slug }, updatedData, {
        new: true,
        runValidators: true,
      }).lean();
      return updateSchedule;
    }
    catch (error) {
      throw new Error('Lỗi khi cập nhật lịch trình: ' + error.message);
    }
  }

  async deleteSchedule(slug) { // Đã có sẵn hàm này, và dùng slug
    try {
      const result = await Schedule.findOneAndDelete({ slug: slug }).lean();
      return result;
    } catch (error) {
      throw new Error('Lỗi khi xoá lịch trình: ' + error.message);
    }
  }
}

export default new ScheduleService();