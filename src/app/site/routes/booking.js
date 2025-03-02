// src/app/site/routes/booking.js
import express from 'express';
import * as BookingController from '../controllers/BookingController.js'; // SỬA Ở ĐÂY
import { body } from 'express-validator';

const router = express.Router();

router.post('/', [
    body('name').notEmpty().withMessage('Tên không được để trống'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('phone').notEmpty().withMessage('Số điện thoại không được để trống'),
    body('date').notEmpty().withMessage('Ngày không được để trống'),
    body('time').notEmpty().withMessage('Thời gian không được để trống'),
    body('venue').notEmpty().withMessage('Địa điểm không được để trống')
], BookingController.store);
router.get('/:id', BookingController.show);
router.get('/create', BookingController.create); // Thêm lại

export default router;