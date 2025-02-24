// src/routes/home.js
import express from 'express';
import * as HomeController from '../app/controllers/HomeController.js'; // Import controller

const router = express.Router();

router.get('/', HomeController.home); // Sử dụng controller

export default router;