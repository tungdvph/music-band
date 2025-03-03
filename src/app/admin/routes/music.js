// src/app/admin/routes/music.js
import express from 'express';
import * as MusicController from '../controllers/MusicController.js'; // Sửa đường dẫn
import { requireLogin, requireAdmin } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Áp dụng middleware cho tất cả các route trong file này
router.use(requireLogin);
router.use(requireAdmin);

router.get('/', MusicController.index);
router.get('/create', MusicController.create);
router.post('/', MusicController.store);
router.get('/:slug', MusicController.show);
router.get('/:slug/edit', MusicController.edit);
router.put('/:slug', MusicController.update);
router.get('/:slug/delete', MusicController.confirmDelete);
router.delete('/:slug', MusicController.destroy);

export default router;