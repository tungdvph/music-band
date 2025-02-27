// src/routes/admin/members.js
import express from 'express';
import * as membersController from '../../app/adminControllers/MembersController.js';
import { requireAdmin } from '../../app/middleware/authMiddleware.js';

const router = express.Router();

// Middleware kiểm tra quyền admin
// router.use(requireAdmin);

// Route quản lý thành viên
router.get('/', membersController.index);
router.get('/create', membersController.create);
router.post('/', membersController.store);
router.get('/:slug', membersController.show);
router.get('/:slug/edit', membersController.edit);
router.put('/:slug', membersController.update);
router.get('/:slug/delete', membersController.confirmDelete);
router.delete('/:slug', membersController.destroy);

export default router;