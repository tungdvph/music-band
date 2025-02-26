// src/app/services/ScheduleService.js
// src/app/services/ScheduleService.js
import Schedule from '../models/Schedule.js';

export const getAllSchedules = async () => {
    try {
        const schedules = await Schedule.find({}).populate('band').lean();
        return schedules;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách lịch trình: ' + error.message);
    }
};

export const getScheduleBySlug = async (slug) => {
    try {
        const schedule = await Schedule.findOne({ slug }).populate('band').lean();
        return schedule;
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin lịch trình: ' + error.message);
    }
};

export const createSchedule = async (scheduleData) => {
    try {
        const newSchedule = await Schedule.create(scheduleData);
        return newSchedule;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Tiêu đề đã tồn tại")
        }
        throw new Error('Lỗi khi tạo lịch trình: ' + error.message);
    }
};

export const updateSchedule = async (slug, updatedData) => {
    try {
        const updatedSchedule = await Schedule.findOneAndUpdate({ slug: slug }, updatedData, { new: true, runValidators: true }).lean();
        return updatedSchedule;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Tiêu đề đã tồn tại")
        }
        throw new Error('Lỗi khi cập nhật lịch trình: ' + error.message);
    }
};

export const deleteSchedule = async (slug) => {
    try {
        const result = await Schedule.findOneAndDelete({ slug: slug }).lean();
        return result;
    } catch (error) {
        throw new Error('Lỗi khi xóa lịch trình: ' + error.message);
    }
};