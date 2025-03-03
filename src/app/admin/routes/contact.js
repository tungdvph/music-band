// src/app/admin/routes/contact.js
import express from 'express';
import * as ContactController from '../controllers/ContactController.js'; // Sửa đường dẫn
import { requireLogin, requireAdmin } from '../../middleware/authMiddleware.js';
const router = express.Router();
// Áp dụng middleware cho tất cả các route trong file này
router.use(requireLogin);
router.use(requireAdmin);

router.get('/', ContactController.index);
router.get('/:id', ContactController.show); // Xem chi tiết
router.post('/:id/status', ContactController.updateStatus); // Cập nhật trạng thái
router.post('/:id/mark-as-read', ContactController.markAsRead); // Đánh dấu là đã đọc
router.delete('/:id', ContactController.destroy);
// Thêm các route khác (edit, update, ...) nếu cần

export default router;