// src/app/admin/routes/bookings.js
import express from 'express';
import * as bookingController from '../controllers/BookingController.js'; // Sửa đường dẫn

const router = express.Router();

// Route quản lý bookings
router.get('/', bookingController.index);
router.get('/create', bookingController.create);
router.post('/', bookingController.store);
router.get('/:id', bookingController.show);
router.get('/:id/edit', bookingController.edit);
router.put('/:id', bookingController.update);
router.get('/:id/delete', bookingController.confirmDelete);
router.delete('/:id', bookingController.destroy);

export default router;