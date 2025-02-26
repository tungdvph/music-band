import express from 'express';
import * as MusicController from '../app/controllers/MusicController.js';
// import { requireAdmin } from '../middleware/auth.js'; // Nếu bạn có middleware

const router = express.Router();

router.get('/', MusicController.index);
router.get('/create', MusicController.create);
router.post('/', MusicController.store);
router.get('/:slug', MusicController.show);
router.get('/:slug/edit', MusicController.edit);
router.put('/:slug', MusicController.update); // Đã sửa
router.delete('/:slug', MusicController.destroy); //Đã sửa

export default router;