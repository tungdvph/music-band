// src/routes/auth.js
import express from 'express';
import * as authController from '../../controllers/AuthController.js'; // Import auth controller

const router = express.Router();

router.get('/login', authController.login); // Use the imported controller
router.get('/register', authController.register);

export default router;