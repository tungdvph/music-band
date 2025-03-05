// src/app/admin/controllers/ScheduleController.js
import ScheduleService from '../services/ScheduleService.js';
import { validationResult } from 'express-validator';
//import Schedule from '../../models/Schedule.js'; // Không cần import trực tiếp Model ở đây

export const index = async (req, res, next) => {
    try {
        const schedules = await ScheduleService.getAllSchedules();
        res.render('schedule/index', { title: 'Quản lý lịch trình', schedules, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

//show
export const show = async (req, res, next) => {
    try {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug); // Dùng getScheduleBySlug và req.params.slug
        if (!schedule) {
            return res.status(404).render('error', { message: "Không tìm thấy lịch trình" });
        }
        res.render('schedule/show', { title: schedule.title, schedule: schedule, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

// CREATE
export const create = async (req, res) => {
    res.render('schedule/create', { title: 'Thêm lịch trình', layout: 'admin' });
};

export const store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Có lỗi validation
        return res.status(400).render('schedule/create', {
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
        next(error);
    }
};

// UPDATE
export const edit = async (req, res, next) => {
    try {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug); // Dùng getScheduleBySlug

        if (!schedule) {
            return res.status(404).render('error', { message: 'Không tìm thấy lịch trình' });
        }
        res.render('schedule/edit', { title: 'Chỉnh sửa lịch trình', schedule: schedule, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug);  // Lấy lại schedule

        return res.status(400).render('schedule/edit', {
            title: 'Chỉnh sửa lịch trình',
            errors: errors.array(),
            schedule: schedule,  // Truyền schedule
            layout: 'admin'
        });
    }
    try {
        const updatedSchedule = await ScheduleService.updateSchedule(req.params.slug, req.body); // Dùng req.params.slug

        if (!updatedSchedule) {
            return res.status(404).render('error', { message: "Không tìm thấy lịch trình" });
        }
        res.redirect(`/admin/schedule`); // Chuyển hướng về trang danh sách
    } catch (error) {
        next(error);
    }
};

// DELETE
export const confirmDelete = async (req, res, next) => {
    try {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug); // Dùng getScheduleBySlug

        if (!schedule) {
            return res.status(404).render('error', { message: 'Không tìm thấy lịch trình' });
        }

        res.render('schedule/confirm-delete', { title: 'Xác nhận xóa', schedule: schedule, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const destroy = async (req, res, next) => {
    try {
        const result = await ScheduleService.deleteSchedule(req.params.slug); // Dùng req.params.slug
        if (!result) {
            return res.status(404).render('error', { message: "Không tìm thấy lịch trình để xóa" });
        }
        res.redirect('/admin/schedule'); // Chuyển hướng về trang danh sách
    } catch (error) {
        next(error);
    }
};

// Thêm hàm lấy danh sách cho client
export const getScheduleForClient = async (req, res) => {
    try {
        const schedules = await ScheduleService.getAllSchedules();
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách lịch diễn.' });
    }
};

// Thêm hàm lấy chi tiết cho client
export const getScheduleDetail = async (req, res) => {
    try {
        const schedule = await ScheduleService.getScheduleBySlug(req.params.slug);
        if (!schedule) {
            return res.status(404).json({ message: 'Không tìm thấy lịch diễn' });
        }
        res.json(schedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};