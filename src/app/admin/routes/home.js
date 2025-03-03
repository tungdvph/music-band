import express from 'express';
import * as homeController from '../controllers/HomeController.js';
// import { requireLogin, requireAdmin } from '../../middleware/authMiddleware.js'; 

const router = express.Router();

// Áp dụng middleware cho tất cả các route trong file này
// router.use(requireLogin);
// router.use(requireAdmin);

router.get('/', homeController.index);

export default router;