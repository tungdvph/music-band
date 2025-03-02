// src/app/admin/routes/users.js
import express from 'express';
import * as usersController from '../../controllers/UsersController.js'; // Sửa đường dẫn
import { requireAdmin } from '../../../middleware/authMiddleware.js'; // Sửa đường dẫn

const router = express.Router();

// Middleware kiểm tra quyền admin
router.use(requireAdmin);

// Route quản lý người dùng
router.get('/', usersController.index);
// ... các route khác cho users ...

export default router;