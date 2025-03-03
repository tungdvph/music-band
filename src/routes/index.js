// src/routes/index.js
import express from 'express';

// SITE routes
import siteContactRouter from '../app/site/routes/contact.js';
import siteBookingRouter from '../app/site/routes/booking.js';
import siteMembersRouter from '../app/site/routes/members.js';
import siteMusicinRouter from '../app/site/routes/music.js';
import siteNewsRouter from '../app/site/routes/news.js';
import siteScheduleRouter from '../app/site/routes/schedule.js';

// ADMIN routes
import adminHomeRouter from '../app/admin/routes/home.js';
import adminContactRouter from '../app/admin/routes/contact.js';
import adminMembersRouter from '../app/admin/routes/members.js';
import adminScheduleRouter from '../app/admin/routes/schedule.js';
import adminMusic from '../app/admin/routes/music.js';
import adminbookings from '../app/admin/routes/bookings.js';
import adminnews from '../app/admin/routes/news.js';
import adminUsersRouter from '../app/admin/routes/users.js';
import adminAuthRouter from '../app/admin/routes/auth.js';

import { requireLogin, requireAdmin } from '../app/middleware/authMiddleware.js'; // Import


const router = express.Router();

// SITE routes
router.get('/', (req, res) => {
    res.render('home', { layout: false }); // Trang chủ (nếu có)
});
router.use('/contact', siteContactRouter);
router.use('/booking', siteBookingRouter);
router.use('/members', siteMembersRouter);
router.use('/music', siteMusicinRouter);
router.use('/news', siteNewsRouter);
router.use('/schedule', siteScheduleRouter);

// ADMIN routes
router.use('/admin/auth', adminAuthRouter); // Auth routes (login, logout) *không* cần requireLogin
router.use('/admin', requireLogin, adminHomeRouter); // Áp dụng requireLogin cho tất cả /admin
router.use('/admin/contacts', requireLogin, adminContactRouter);
router.use('/admin/members', requireLogin, adminMembersRouter);
router.use('/admin/schedule', requireLogin, adminScheduleRouter);
router.use('/admin/music', requireLogin, adminMusic);
router.use('/admin/bookings', requireLogin, adminbookings);
router.use('/admin/news', requireLogin, adminnews);
router.use('/admin/users', requireLogin, requireAdmin, adminUsersRouter); // Cần cả requireLogin và requireAdmin

// Route mặc định cho /admin (chuyển hướng đến /admin/dashboard), đã có requireLogin ở trên
// router.get('/', (req, res) => {
//     res.redirect('/admin/dashboard');
// });

export default router;