// src/app/controllers/ScheduleController.js
import Schedule from '../models/Schedule.js'; // Import model

export const index = async (req, res) => {
    try {
        const schedules = await Schedule.find({}).populate('band').lean(); // Lấy tất cả lịch trình, populate để lấy thông tin band
        res.render('schedule/index', { title: 'Lịch trình', schedules: schedules });
    }
    catch (error) {
        console.error(error);
        res.render('error', { message: "Lỗi Server" })
    }

};