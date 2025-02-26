// src/routes/admin.js
import express from 'express';
const router = express.Router();

// Import controllers
import * as dashboardController from '../app/adminControllers/DashboardController.js';
import * as usersController from '../app/adminControllers/UsersController.js';
import * as bookingController from '../app/adminControllers/BookingController.js';

import { requireAdmin } from '../app/middleware/authMiddleware.js'; // Import middleware

// Middleware kiểm tra quyền admin (cho tất cả các route trong file này)
router.use(requireAdmin);

// Route cho dashboard
router.get('/', dashboardController.index);

// Route quản lý người dùng
router.get('/users', usersController.index);
// ... các route khác cho users ...

// Route quản lý bookings
router.get('/bookings', bookingController.index);
router.get('/bookings/create', bookingController.create); // THÊM DÒNG NÀY!
router.post('/bookings', bookingController.store);       // THÊM DÒNG NÀY!
router.get('/bookings/:id', bookingController.show);
router.get('/bookings/:id/edit', bookingController.edit);
router.put('/bookings/:id', bookingController.update);
router.get('/bookings/:id/delete', bookingController.confirmDelete);
router.delete('/bookings/:id', bookingController.destroy);

// ... các route admin khác ...

export default router;