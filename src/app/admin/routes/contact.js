// src/app/admin/routes/contact.js
import express from 'express';
import * as ContactController from '../controllers/ContactController.js'; // Sửa đường dẫn

const router = express.Router();


router.get('/', ContactController.index);
router.get('/:id', ContactController.show); // Xem chi tiết
router.post('/:id/status', ContactController.updateStatus); // Cập nhật trạng thái
router.post('/:id/mark-as-read', ContactController.markAsRead); // Đánh dấu là đã đọc
router.delete('/:id', ContactController.destroy);
// Thêm các route khác (edit, update, ...) nếu cần

export default router;