// src/app/admin/routes/music.js
import express from 'express';
import * as MusicController from '../controllers/MusicController.js'; // Sửa đường dẫn
// import { requireAdmin } from '../../middleware/authMiddleware.js'; // Sửa đường dẫn

const router = express.Router();

// router.use(requireAdmin); // Middleware nếu cần

router.get('/', MusicController.index);
router.get('/create', MusicController.create);
router.post('/', MusicController.store);
router.get('/:slug', MusicController.show);
router.get('/:slug/edit', MusicController.edit);
router.put('/:slug', MusicController.update);
router.get('/:slug/delete', MusicController.confirmDelete);
router.delete('/:slug', MusicController.destroy);

export default router;