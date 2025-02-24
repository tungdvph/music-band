// src/routes/index.js
import express from 'express';
import homeRouter from './home.js';
import membersRouter from './members.js';
import scheduleRouter from './schedule.js';
import musicRouter from './music.js';
import bookingRouter from './booking.js';
import contactRouter from './contact.js';
import authRouter from './auth.js';
import newsRouter from './news.js';
import otherRouter from './other.js';

const router = express.Router();

// Sử dụng các router con
router.use('/', homeRouter);
router.use('/members', membersRouter);
router.use('/schedule', scheduleRouter);
router.use('/music', musicRouter);
router.use('/booking', bookingRouter);
router.use('/contact', contactRouter);
router.use('/auth', authRouter); // /auth/login, /auth/register
router.use('/news', newsRouter);
router.use('/other', otherRouter);
export default router;