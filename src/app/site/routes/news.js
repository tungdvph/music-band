import express from 'express';
import * as NewsController from '../controllers/NewsController.js';

const router = express.Router();

router.get('/', NewsController.index);
router.get('/:slug', NewsController.show);

export default router;