// src/routes/admin/schedule.js
import express from 'express';
import * as scheduleController from '../../app/adminControllers/ScheduleController.js';
// import { requireAdmin } from '../../app/middleware/authMiddleware.js'; // Bỏ comment khi cần

const router = express.Router();

// Middleware kiểm tra quyền admin (tạm thời comment để test)
// router.use(requireAdmin);

router.get('/', scheduleController.index);
router.get('/create', scheduleController.create);
router.post('/', scheduleController.store);
router.get('/:id', scheduleController.show);        // Thêm route show
router.get('/:id/edit', scheduleController.edit);
router.put('/:id', scheduleController.update);
router.get('/:id/delete', scheduleController.confirmDelete); // Thêm route confirmDelete
router.delete('/:id', scheduleController.destroy);

export default router;