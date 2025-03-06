// src/app/admin/routes/auth.js
import express from 'express';
import * as authController from '../controllers/AuthController.js'; // Dùng authController
import { checkDefaultAdmin, requireLogin } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/login', authController.login); // Dùng authController
router.post('/login', checkDefaultAdmin, authController.handleLogin); // Dùng authController
router.get('/logout', requireLogin, authController.logout); // Dùng authController

export default router;