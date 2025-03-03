// src/app/admin/routes/auth.js
import express from 'express';
import * as authController from '../controllers/AuthController.js';

const router = express.Router();

router.get('/login', authController.login);
router.post('/login', authController.handleLogin);
router.get('/logout', authController.logout); // Thêm route logout


export default router;