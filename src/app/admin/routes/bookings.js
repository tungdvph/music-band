// src/app/admin/routes/bookings.js
import express from 'express';
import * as bookingController from '../controllers/BookingController.js'; // Sửa đường dẫn
import { requireLogin, requireAdmin } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Áp dụng middleware cho tất cả các route trong file này
router.use(requireLogin);
router.use(requireAdmin);

// Route quản lý bookings
router.get('/', bookingController.index);
router.get('/create', bookingController.create);
router.post('/', bookingController.store);
router.get('/:id', bookingController.show);
router.get('/:id/edit', bookingController.edit);
router.put('/:id', bookingController.update);
router.get('/:id/delete', bookingController.confirmDelete);
router.delete('/:id', bookingController.destroy);

export default router;