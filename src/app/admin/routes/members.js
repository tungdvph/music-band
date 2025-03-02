// src/app/admin/routes/members.js (Đã sửa)
import express from 'express';
import * as membersController from '../controllers/MembersController.js'; // Sửa đường dẫn
import { requireAdmin } from '../../middleware/authMiddleware.js'; // Bỏ comment và sửa đường dẫn nếu bạn dùng middleware

const router = express.Router();

// Middleware kiểm tra quyền admin (Nếu cần)
// router.use(requireAdmin); // Bỏ comment nếu dùng

// Route quản lý thành viên
router.get('/', membersController.index);
router.get('/create', membersController.create);
router.post('/', membersController.store);
router.get('/:slug', membersController.show);
router.get('/:slug/edit', membersController.edit);
router.put('/:slug', membersController.update);
router.get('/:slug/delete', membersController.confirmDelete); // Route này thường dùng để hiển thị trang xác nhận xóa
router.delete('/:slug', membersController.destroy);

export default router;