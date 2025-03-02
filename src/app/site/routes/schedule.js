// src/app/site/routes/schedule.js
import express from 'express';
import * as ScheduleController from '../controllers/ScheduleController.js'; //Sửa
import { body } from 'express-validator'; // (Nếu bạn dùng)
const router = express.Router();

// Loại bỏ CREATE, UPDATE, DELETE
// router.get('/create', ScheduleController.create);
// router.post('/', ...);

// READ
router.get('/', ScheduleController.index);
router.get('/:slug', ScheduleController.show);

// router.get('/:slug/edit', ScheduleController.edit);
// router.put('/:slug', ...);
// router.get('/:slug/delete', ScheduleController.confirmDelete);
// router.delete('/:slug', ScheduleController.destroy);

export default router;