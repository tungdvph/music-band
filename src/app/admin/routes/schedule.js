// src/app/admin/routes/schedule.js
import express from 'express';
import * as scheduleController from '../controllers/ScheduleController.js';

const router = express.Router();

router.get('/', scheduleController.index);
router.get('/create', scheduleController.create);
router.post('/', scheduleController.store);
router.get('/:id', scheduleController.show);
router.get('/:id/edit', scheduleController.edit);
router.put('/:id', scheduleController.update);
router.get('/:id/delete', scheduleController.confirmDelete);
router.delete('/:id', scheduleController.destroy);

export default router;