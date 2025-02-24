// src/routes/schedule.js
import express from 'express';
import * as ScheduleController from '../app/controllers/ScheduleController.js';

const router = express.Router();

router.get('/', ScheduleController.index);

export default router;