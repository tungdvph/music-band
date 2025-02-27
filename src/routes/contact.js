// src/routes/contact.js

import express from 'express';
import * as ContactController from '../app/controllers/ContactController.js';
import { body } from 'express-validator';

const router = express.Router();
// Validation rules
const contactValidationRules = [
    body('name').notEmpty().withMessage('Vui lòng nhập họ và tên.'),
    body('email').isEmail().withMessage('Vui lòng nhập địa chỉ email hợp lệ.'),
    body('message').notEmpty().withMessage('Vui lòng nhập nội dung tin nhắn.'),
    // Thêm các rules khác nếu cần
];

router.get('/', ContactController.index);
router.post('/', contactValidationRules, ContactController.create);  // Sử dụng validation middleware

export default router;