// src/routes/admin/dashboard.js
import express from 'express';
import * as dashboardController from '../../app/adminControllers/DashboardController.js';
import { requireAdmin } from '../../app/middleware/authMiddleware.js';

const router = express.Router();

// Middleware kiểm tra quyền admin
router.use(requireAdmin);

// Route cho dashboard
router.get('/', dashboardController.index);

export default router;