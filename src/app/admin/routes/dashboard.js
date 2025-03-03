// src/app/admin/routes/dashboard.js
import express from 'express';
import * as dashboardController from '../../controllers/DashboardController.js';
import { requireLogin, requireAdmin } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Áp dụng middleware cho tất cả các route trong file này
router.use(requireLogin);
router.use(requireAdmin);

// Route cho dashboard
router.get('/', dashboardController.index);

export default router;