// src/app/admin/controllers/ScheduleController.js
import ScheduleService from '../services/ScheduleService.js'; // Sửa import
import { validationResult } from 'express-validator';

export const index = async (req, res, next) => {
    try {
        const schedules = await ScheduleService.getAllSchedules();
        res.render('schedule/index', { title: 'Quản lý lịch trình', schedules, layout: 'admin' }); // SỬA Ở ĐÂY
    } catch (error) {
        next(error);
    }
};

//show
export const show = async (req, res, next) => {
    try {
        const schedule = await ScheduleService.getScheduleById(req.params.id);
        if (!schedule) {
            return res.status(404).render('error', { message: "Không tìm thấy lịch trình" });
        }
        res.render('schedule/show', { title: schedule.title, schedule: schedule, layout: 'admin' }) // SỬA Ở ĐÂY
    } catch (error) {
        next(error)
    }
}

// CREATE
export const create = async (req, res) => {
    res.render('schedule/create', { title: 'Thêm lịch trình', layout: 'admin' }); // SỬA Ở ĐÂY
};

export const store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Có lỗi validation
        return res.status(400).render('schedule/create', { // SỬA Ở ĐÂY
            title: 'Thêm lịch trình',
            errors: errors.array(),
            schedule: req.body, //Gửi lại dữ liệu
            layout: 'admin'
        });
    }

    try {
        const newSchedule = await ScheduleService.createSchedule(req.body);
        res.redirect('/admin/schedule'); // Chuyển hướng về trang danh sách (hoặc trang chi tiết)
    } catch (error) {
        next(error)
    }
};

// UPDATE
export const edit = async (req, res, next) => {
    try {
        const schedule = await ScheduleService.getScheduleById(req.params.id);

        if (!schedule) {
            return res.status(404).render('error', { message: 'Không tìm thấy lịch trình' });
        }
        res.render('schedule/edit', { title: 'Chỉnh sửa lịch trình', schedule: schedule, layout: 'admin' }); // SỬA Ở ĐÂY
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const schedule = await ScheduleService.getScheduleById(req.params.id); // Phải lấy lại schedule

        // Có lỗi, render lại form edit
        return res.status(400).render('schedule/edit', { // SỬA Ở ĐÂY
            title: 'Chỉnh sửa lịch trình',
            errors: errors.array(),
            schedule: schedule,  // Sửa lại đây, truyền schedule, không gộp
            layout: 'admin'
        });
    }
    try {
        const updatedSchedule = await ScheduleService.updateSchedule(req.params.id, req.body);

        if (!updatedSchedule) {
            return res.status(404).render('error', { message: "Không tìm thấy lịch trình" })
        }
        res.redirect(`/admin/schedule`); // Chuyển hướng về trang danh sách
    } catch (error) {
        next(error)
    }
};

// DELETE
export const confirmDelete = async (req, res, next) => {
    try {
        const schedule = await ScheduleService.getScheduleById(req.params.id);

        if (!schedule) {
            return res.status(404).render('error', { message: 'Không tìm thấy lịch trình' });
        }

        res.render('schedule/confirm-delete', { title: 'Xác nhận xóa', schedule: schedule, layout: 'admin' }); // SỬA Ở ĐÂY, render view xác nhận
    } catch (error) {
        next(error);
    }
};
export const destroy = async (req, res, next) => {
    try {
        const result = await ScheduleService.deleteSchedule(req.params.id);
        if (!result) {
            return res.status(404).render('error', { message: "Không tìm thấy lịch trình để xóa" })
        }
        res.redirect('/admin/schedule'); // Chuyển hướng về trang danh sách
    } catch (error) {
        next(error)
    }
};