// src/app/site/routes/contact.js
import express from 'express';
import * as ContactController from '../controllers/ContactController.js'; // SỬA Ở ĐÂY
import { body } from 'express-validator';

const router = express.Router();

const contactValidationRules = [
    body('name').notEmpty().withMessage('Vui lòng nhập họ và tên.'),
    body('email').isEmail().withMessage('Vui lòng nhập địa chỉ email hợp lệ.'),
    body('message').notEmpty().withMessage('Vui lòng nhập nội dung tin nhắn.'),
];

router.post('/', contactValidationRules, ContactController.create);
router.get('/', ContactController.index); //thiếu

export default router;