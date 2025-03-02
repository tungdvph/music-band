// src/routes/index.js
import express from 'express';

// Các route handler cho trang PUBLIC
import homeRouter from './home.js';
import membersRouter from './members.js';
import scheduleRouter from './schedule.js';
import musicRouter from './music.js';
import bookingRouter from './booking.js';
import contactRouter from './contact.js'; // Thay đổi ở đây
import authRouter from './auth.js';
import newsRouter from './news.js';
import otherRouter from './other.js';

// Import route handler cho trang ADMIN
import adminRouter from './admin/index.js';

const router = express.Router();

// Sử dụng các router con cho trang PUBLIC
router.use('/', homeRouter);
router.use('/members', membersRouter);
router.use('/schedule', scheduleRouter);
router.use('/music', musicRouter);
router.use('/booking', bookingRouter);
router.use('/contact', contactRouter); // Thay đổi ở đây
router.use('/auth', authRouter);
router.use('/news', newsRouter);
router.use('/other', otherRouter);

// Định tuyến cho trang ADMIN
router.use('/admin', adminRouter);

export default router;