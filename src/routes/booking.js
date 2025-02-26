// src/routes/booking.js
import express from 'express';
import * as BookingController from '../app/controllers/BookingController.js';
import { body } from 'express-validator';

const router = express.Router();
// Create
router.get('/create', BookingController.create);
router.post('/', [
    body('name').notEmpty().withMessage('Tên không được để trống'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('phone').notEmpty().withMessage('Số điện thoại không được để trống'),
    body('date').notEmpty().withMessage('Ngày không được để trống'),
    body('time').notEmpty().withMessage('Thời gian không được để trống'),
    body('venue').notEmpty().withMessage('Địa điểm không được để trống')
], BookingController.store);

// Read
router.get('/', BookingController.index);
router.get('/:id', BookingController.show); // Chú ý: dùng :id thay vì :slug

// Update
router.get('/:id/edit', BookingController.edit);
router.put('/:id', [
    // Validate tương tự như create
    body('name').notEmpty().withMessage('Tên không được để trống'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('phone').notEmpty().withMessage('Số điện thoại không được để trống'),
    body('date').notEmpty().withMessage('Ngày không được để trống'),
    body('time').notEmpty().withMessage('Thời gian không được để trống'),
    body('venue').notEmpty().withMessage('Địa điểm không được để trống')
], BookingController.update);

// Delete
router.get('/:id/delete', BookingController.confirmDelete);
router.delete('/:id', BookingController.destroy);

export default router;