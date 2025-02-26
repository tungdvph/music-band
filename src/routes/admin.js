// src/routes/admin.js
import express from 'express';
const router = express.Router();

// Cập nhật đường dẫn import đến thư mục adminControllers
import * as dashboardController from '../app/adminControllers/DashboardController.js';
import * as usersController from '../app/adminControllers/UsersController.js';
import * as bookingController from '../app/adminControllers/BookingController.js'; // Nếu bạn di chuyển BookingController
// ... import các controller khác từ thư mục adminControllers

import { requireAdmin } from '../app/middleware/authMiddleware.js'; // Import middleware (bạn cần tự tạo file này)

// Middleware kiểm tra quyền admin (tất cả các route trong admin đều cần)
router.use(requireAdmin);

// Route cho dashboard
router.get('/', dashboardController.index);

// Route quản lý người dùng
router.get('/users', usersController.index);
// ... các route khác cho quản lý người dùng (thêm, sửa, xóa)

// Route quản lý bookings (ví dụ, nếu bạn đã chuyển BookingController)
router.get('/bookings', bookingController.index);
router.get('/bookings/:id', bookingController.show);
router.get('/bookings/:id/edit', bookingController.edit);
router.put('/bookings/:id', bookingController.update);
router.get('/bookings/:id/delete', bookingController.confirmDelete);
router.delete('/bookings/:id', bookingController.destroy);

// ... các route admin khác (music, news, ...)

export default router;