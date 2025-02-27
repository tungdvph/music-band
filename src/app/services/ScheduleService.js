// src/app/services/ScheduleService.js
import Schedule from '../models/Schedule.js';

class ScheduleService { // Giữ nguyên class
  async getAllSchedules() {
    try {
      const schedules = await Schedule.find({}).lean();
      return schedules;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách lịch trình: ' + error.message);
    }
  }

  async getScheduleById(id) {
    try {
      const schedule = await Schedule.findById(id).lean();
      return schedule;
    } catch (error) {
      throw new Error('Lỗi khi lấy lịch trình: ' + error.message);
    }
  }

  async createSchedule(scheduleData) {
    try {
      const newSchedule = new Schedule(scheduleData);
      await newSchedule.save();
      return newSchedule.toObject();
    } catch (error) {
      throw new Error('Lỗi khi tạo lịch trình: ' + error.message);
    }
  }

  async updateSchedule(id, updateData) {
    try {
      const updatedSchedule = await Schedule.findByIdAndUpdate(id, updateData, { new: true }).lean();
      return updatedSchedule;
    } catch (error) {
      throw new Error('Lỗi khi cập nhật lịch trình: ' + error.message);
    }
  }

  async deleteSchedule(id) {
    try {
      const result = await Schedule.findByIdAndDelete(id);
      return result;
    } catch (error) {
      throw new Error('Lỗi khi xóa lịch trình: ' + error.message);
    }
  }
}

export default ScheduleService; // Export chính class