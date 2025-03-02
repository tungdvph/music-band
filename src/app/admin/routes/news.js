// src/app/admin/routes/news.js
import express from 'express';
import *as NewsController from '../controllers/NewsController.js';
// import { requireAdmin } from '../../middleware/authMiddleware.js'; // Sửa đường dẫn

const router = express.Router();

// router.use(requireAdmin); // Middleware nếu cần

router.get('/', NewsController.index);
router.get('/create', NewsController.create);
router.post('/', NewsController.store);
router.get('/:slug', NewsController.show);
router.get('/:slug/edit', NewsController.edit);
router.put('/:slug', NewsController.update); // Đã sửa
router.get('/:slug/delete', NewsController.confirmDelete); // Dùng slug
router.delete('/:slug', NewsController.destroy); // Dùng slug

export default router;