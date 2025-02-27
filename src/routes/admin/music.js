// src/routes/admin/music.js
import express from 'express';
import MusicController from '../../app/adminControllers/MusicController.js';
// import { requireAdmin } from '../../app/middleware/authMiddleware.js'; // Bỏ comment khi cần

const router = express.Router();

// router.use(requireAdmin); // Tạm thời comment để test

router.get('/', MusicController.index);
router.get('/create', MusicController.create);
router.post('/', MusicController.store);
router.get('/:slug', MusicController.show);
router.get('/:slug/edit', MusicController.edit);
router.put('/:slug', MusicController.update);
router.get('/:slug/delete', MusicController.confirmDelete);
router.delete('/:slug', MusicController.destroy);

export default router;