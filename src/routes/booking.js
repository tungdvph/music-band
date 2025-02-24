// src/routes/booking.js

import express from 'express';
const router = express.Router();

import * as BookingController from '../app/controllers/BookingController.js'
router.get('/', BookingController.index);

export default router;