// src/routes/index.js
import express from 'express';

// Các route handler cho trang PUBLIC
import homeRouter from './home.js';
import membersRouter from './members.js';
import scheduleRouter from './schedule.js';
import musicRouter from './music.js';
import bookingRouter from './booking.js'; // GIỮ NGUYÊN DÒNG NÀY
import contactRouter from './contact.js';
import authRouter from './auth.js';
import newsRouter from './news.js';
import otherRouter from './other.js';

// Import route handler cho trang ADMIN
import adminRoutes from './admin.js';

const router = express.Router();

// Sử dụng các router con cho trang PUBLIC
router.use('/', homeRouter);
router.use('/members', membersRouter);
router.use('/schedule', scheduleRouter);
router.use('/music', musicRouter);
router.use('/booking', bookingRouter); // GIỮ NGUYÊN DÒNG NÀY
router.use('/contact', contactRouter);
router.use('/auth', authRouter);
router.use('/news', newsRouter);
router.use('/other', otherRouter);

// Định tuyến cho trang ADMIN
router.use('/admin', adminRoutes);

export default router;