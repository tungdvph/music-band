//src/app/site/routes/news.js
import express from 'express';
import * as NewsController from '../controllers/NewsController.js'; //Sửa đường dẫn

const router = express.Router();

router.get('/', NewsController.index);
router.get('/:slug', NewsController.show); // Thêm route này

export default router;