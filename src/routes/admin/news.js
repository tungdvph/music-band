// src/routes/admin/news.js
import express from 'express';
import NewsController from '../../app/adminControllers/NewsController.js';
// import { requireAdmin } from '../../app/middleware/authMiddleware.js';

const router = express.Router();

// router.use(requireAdmin); // Tạm thời comment

router.get('/', NewsController.index);
router.get('/create', NewsController.create);
router.post('/', NewsController.store);
router.get('/:slug', NewsController.show);
router.get('/:slug/edit', NewsController.edit);        // Dùng slug
router.put('/:slug/update', NewsController.update);   // Dùng slug, thêm /update
router.get('/:id/delete', NewsController.confirmDelete);
router.delete('/:id', NewsController.destroy);
export default router;