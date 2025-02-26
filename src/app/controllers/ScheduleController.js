// src/app/controllers/ScheduleController.js
import * as ScheduleService from '../services/ScheduleService.js';
import { validationResult } from 'express-validator';

export const index = async (req, res) => {
    try {
        const schedules = await ScheduleService.getAllSchedules();
        res.render('schedule/index', { title: 'Lịch trình', schedules });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || 'Lỗi khi tải trang lịch trình.' });
    }
};

//show
export const show = async (req, res) => {
    try {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug);
        if (!schedule) {
            return res.status(404).render('error', { message: "Không tìm thấy lịch trình" });
        }
        res.render('schedule/show', { title: schedule.title, schedule: schedule })
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || "Lỗi server." })
    }
}

// CREATE
export const create = async (req, res) => {
    res.render('schedule/create', { title: 'Thêm lịch trình' });
};

export const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Có lỗi validation
        return res.status(400).render('schedule/create', {
            title: 'Thêm lịch trình',
            errors: errors.array(),
            schedule: req.body, // Gửi lại dữ liệu đã nhập
        });
    }

    try {
        const newSchedule = await ScheduleService.createSchedule(req.body);
        res.redirect('/schedule'); // Chuyển hướng về trang danh sách (hoặc trang chi tiết)
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || "Có lỗi xảy ra" })
    }
};

// UPDATE
export const edit = async (req, res) => {
    try {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug);

        if (!schedule) {
            return res.status(404).render('error', { message: 'Không tìm thấy lịch trình' });
        }
        res.render('schedule/edit', { title: 'Chỉnh sửa lịch trình', schedule: schedule });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server' });
    }
};

export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug); // Phải lấy lại member

        // Có lỗi, render lại form edit
        return res.status(400).render('schedule/edit', {
            title: 'Chỉnh sửa lịch trình',
            errors: errors.array(),
            schedule: schedule,
        });
    }
    try {
        const updatedSchedule = await ScheduleService.updateSchedule(req.params.slug, req.body);

        if (!updatedSchedule) {
            return res.status(404).render('error', { message: "Không tìm thấy lịch trình" })
        }
        res.redirect(`/schedule/${req.params.slug}`); // Chuyển hướng về trang chi tiết
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || "Có lỗi xảy ra" })
    }
};

// DELETE
export const confirmDelete = async (req, res) => {
    try {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug);

        if (!schedule) {
            return res.status(404).render('error', { message: 'Không tìm thấy lịch trình' });
        }

        res.render('schedule/confirm-delete', { title: 'Xác nhận xóa', schedule: schedule }); // Render view xác nhận
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server' });
    }
};
export const destroy = async (req, res) => {
    try {
        const result = await ScheduleService.deleteSchedule(req.params.slug);
        if (!result) {
            return res.status(404).render('error', { message: "Không tìm thấy lịch trình để xóa" })
        }
        res.redirect('/schedule'); // Chuyển hướng về trang danh sách
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || "Có lỗi xảy ra" })
    }
};