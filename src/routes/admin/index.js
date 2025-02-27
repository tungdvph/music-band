// src/routes/admin/index.js
import express from 'express';

// Import route handler cho trang ADMIN
import adminDashboardRouter from './dashboard.js';
import adminUsersRouter from './users.js';
import adminBookingsRouter from './bookings.js';
import adminMembersRouter from './members.js';
import adminContactsRouter from './contact.js'; 
import adminNewsRouter from './news.js';
import adminOthersRouter from './other.js';
import adminMusicRouter from './music.js';     
import adminScheduleRouter from './schedule.js'; 

const router = express.Router();

// Định tuyến cho trang ADMIN
router.use('/dashboard', adminDashboardRouter);
router.use('/users', adminUsersRouter);
router.use('/bookings', adminBookingsRouter);
router.use('/members', adminMembersRouter);
router.use('/contacts', adminContactsRouter);
router.use('/news', adminNewsRouter);
router.use('/others', adminOthersRouter);
router.use('/music', adminMusicRouter);
router.use('/schedule', adminScheduleRouter);

// Route mặc định cho /admin
router.get('/', (req, res) => {
    res.redirect('/admin/dashboard');
});

export default router;