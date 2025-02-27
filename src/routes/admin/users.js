// src/routes/admin/users.js
import express from 'express';
import * as usersController from '../../app/adminControllers/UsersController.js';
import { requireAdmin } from '../../app/middleware/authMiddleware.js';

const router = express.Router();

// Middleware kiểm tra quyền admin
router.use(requireAdmin);

// Route quản lý người dùng
router.get('/', usersController.index);
// ... các route khác cho users ...

export default router;