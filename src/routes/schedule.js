// src/routes/schedule.js
import express from 'express';
import * as ScheduleController from '../app/controllers/ScheduleController.js';
import { body } from 'express-validator';
const router = express.Router();

// Create
router.get('/create', ScheduleController.create);
router.post('/', [
    body('title').notEmpty().withMessage('Tiêu đề không được để trống'),
    body('date').notEmpty().withMessage('Ngày không được để trống'),
    body('time').notEmpty().withMessage('Thời gian không được để trống'),
    body('venue').notEmpty().withMessage('Địa điểm không được để trống'),
], ScheduleController.store);

// Read
router.get('/', ScheduleController.index);
router.get('/:slug', ScheduleController.show);

// Update
router.get('/:slug/edit', ScheduleController.edit);
router.put('/:slug', [
    body('title').notEmpty().withMessage('Tiêu đề không được để trống'),
    body('date').notEmpty().withMessage('Ngày không được để trống'),
    body('time').notEmpty().withMessage('Thời gian không được để trống'),
    body('venue').notEmpty().withMessage('Địa điểm không được để trống'),
], ScheduleController.update);

// Delete
router.get('/:slug/delete', ScheduleController.confirmDelete);
router.delete('/:slug', ScheduleController.destroy);


export default router;