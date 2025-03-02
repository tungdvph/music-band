// src/app/site/routes/music.js
import express from 'express';
import * as MusicController from '../controllers/MusicController.js'; // SỬA Ở ĐÂY

const router = express.Router();

router.get('/', MusicController.index);
router.get('/:slug', MusicController.show);

export default router;