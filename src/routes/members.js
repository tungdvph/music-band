// src/routes/members.js
import express from 'express';
import * as MembersController from '../app/controllers/MembersController.js';
import { body } from 'express-validator';

const router = express.Router();

// Create
router.get('/create', MembersController.create);
router.post('/', [
    body('name').notEmpty().withMessage('Tên thành viên không được để trống'),
    body('role').notEmpty().withMessage('Vai trò không được để trống'),
    // ...
], MembersController.store);

// Read
router.get('/', MembersController.index);
router.get('/:slug', MembersController.show);

// Update
router.get('/:slug/edit', MembersController.edit);
router.put('/:slug', [
    // ... validation rules
], MembersController.update);

// Delete
router.get('/:slug/delete', MembersController.confirmDelete); // THÊM DÒNG NÀY: Hiển thị trang xác nhận
router.delete('/:slug', MembersController.destroy); // Xóa thành viên

export default router;