// src/routes/music.js

import express from 'express';
import * as MusicController from '../app/controllers/MusicController.js';

const router = express.Router();

router.get('/', MusicController.index);
router.get('/:slug', MusicController.show);

export default router;