// src/app/admin/routes/users.js
import express from 'express';
import * as usersController from '../controllers/UsersController.js';

const router = express.Router();

// Các route của bạn (giữ nguyên)
router.get('/', usersController.index);
router.get('/create', usersController.create);
router.post('/', usersController.store);
router.get('/:id', usersController.show);
router.get('/:id/edit', usersController.edit);
router.put('/:id', usersController.update);
router.get('/:id/delete', usersController.confirmDelete); // GET cho confirm
router.delete('/:id', usersController.destroy); // DELETE để xóa

export default router;