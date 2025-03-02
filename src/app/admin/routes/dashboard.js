// src/app/admin/routes/dashboard.js
import express from 'express';
import * as dashboardController from '../../controllers/DashboardController.js'; // Sửa đường dẫn
import { requireAdmin } from '../../../middleware/authMiddleware.js'; // Sửa đường dẫn,

const router = express.Router();

// Middleware kiểm tra quyền admin (Nếu cần)
router.use(requireAdmin);

// Route cho dashboard
router.get('/', dashboardController.index);

export default router;