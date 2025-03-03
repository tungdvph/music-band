// src/app/site/controllers/ScheduleController.js
import ScheduleService from '../services/ScheduleService.js'; // Đã sửa đường dẫn

export const index = async (req, res, next) => {
    try {
        const schedules = await ScheduleService.getUpcomingSchedules(); // Hoặc getAllSchedules(), tùy bạn
        res.render('site/schedule/index', { title: 'Lịch trình', schedules, layout: false }); //layout: false
    } catch (error) {
        next(error)
    }
};
export const show = async (req, res, next) => {
    try {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug);
        if (!schedule) {
            return res.status(404).render('error', { message: 'Không tìm thấy lịch trình.', layout: false }); //layout: false
        }
        res.render('site/schedule/show', { title: schedule.title, schedule: schedule, layout: false });//layout: false
    } catch (error) {
        next(error)
    }
}