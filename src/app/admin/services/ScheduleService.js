// src/app/site/services/SiteScheduleService.js

import Schedule from '../../models/Schedule.js';

class AdminScheduleService {
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
      throw new Error('Lỗi khi lấy thông tin lịch trình: ' + error.message);
    }
  }

  async createSchedule(scheduleData) {
    try {
      const newSchedule = await Schedule.create(scheduleData);
      return newSchedule;
    }
    catch (error) {
      throw new Error('Lỗi khi tạo lịch trình: ' + error.message);
    }
  }
  async updateSchedule(id, updatedData) {
    try {
      const updateSchedule = await Schedule.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true,
      }).lean();
      return updateSchedule;
    }
    catch (error) {
      throw new Error('Lỗi khi cập nhật lịch trình: ' + error.message);
    }
  }
  async deleteSchedule(id) {
    try {
      const result = await Schedule.findByIdAndDelete(id).lean();
      return result;
    } catch (error) {
      throw new Error('Lỗi khi xoá lịch trình: ' + error.message);
    }
  }
}
export default new AdminScheduleService();