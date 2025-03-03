// src/app/admin/routes/dashboard.js
import express from 'express';
import * as dashboardController from '../../controllers/DashboardController.js';


const router = express.Router();



// Route cho dashboard
router.get('/', dashboardController.index);

export default router;