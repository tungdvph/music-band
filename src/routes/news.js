// src/routes/news.js
import express from 'express';
import * as NewsController from '../app/controllers/NewsController.js'; // Import NewsController

const router = express.Router();

router.get('/', NewsController.index); // Use NewsController.index

export default router;