// src/app/admin/routes/schedule.js
import express from 'express';
import * as ScheduleController from '../controllers/ScheduleController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', ScheduleController.index);
router.get('/create', ScheduleController.create);
router.post(
    '/',
    [
        body('date').notEmpty().withMessage('Ngày không được để trống'),
        body('time').notEmpty().withMessage('Thời gian không được để trống'),
        body('venue').notEmpty().withMessage('Địa điểm không được để trống'),
        body('title').notEmpty().withMessage('Tiêu đề không được để trống'),
        body('event').notEmpty().withMessage('Sự kiện không được để trống'),
    ],
    ScheduleController.store
);

// Sử dụng :slug thay vì :id
router.get('/:slug', ScheduleController.show);
router.get('/:slug/edit', ScheduleController.edit);
router.put(
    '/:slug',
    [
        body('date').notEmpty().withMessage('Ngày không được để trống'),
        body('time').notEmpty().withMessage('Thời gian không được để trống'),
        body('venue').notEmpty().withMessage('Địa điểm không được để trống'),
        body('title').notEmpty().withMessage('Tiêu đề không được để trống'),
        body('event').notEmpty().withMessage('Sự kiện không được để trống'),
    ],
    ScheduleController.update
);
router.get('/:slug/delete', ScheduleController.confirmDelete);
router.delete('/:slug', ScheduleController.destroy);

export default router;