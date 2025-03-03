// src/app/admin/routes/users.js
import express from 'express';
import * as usersController from '../controllers/UsersController.js';
import { requireAdmin } from '../../middleware/authMiddleware.js'; // Sửa lại đường dẫn cho đúng

const router = express.Router();

// Middleware kiểm tra quyền admin (tạm thời bỏ qua, bạn có thể dùng lại sau khi có hệ thống auth)
// router.use(requireAdmin);

// Route quản lý người dùng
router.get('/create', usersController.create); // Thêm route này
router.get('/', usersController.index);
router.post('/', usersController.store);        // Thêm route này (xử lý form thêm user)
router.get('/:id', usersController.show);       // Thêm route này (xem chi tiết)
router.get('/:id/edit', usersController.edit);   // Thêm route này (sửa)
router.put('/:id', usersController.update);      // Thêm route này (cập nhật, dùng PUT)
router.get('/:id/delete', usersController.confirmDelete); // Thêm route này (xác nhận xóa)
router.delete('/:id', usersController.destroy);   // Thêm route này (xóa, dùng DELETE)

export default router;