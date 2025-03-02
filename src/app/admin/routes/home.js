// src/app/admin/routes/home.js
import express from 'express';
import * as HomeController from '../controllers/HomeController.js'; // Sửa

const router = express.Router();

router.get('/', HomeController.index);

export default router;