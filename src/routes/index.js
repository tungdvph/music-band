import express from 'express';

// SITE routes
import siteContactRouter from '../app/site/routes/contact.js';
import siteBookingRouter from '../app/site/routes/booking.js';
import siteMembersRouter from '../app/site/routes/members.js';
import siteMusicRouter from '../app/site/routes/music.js';
import siteScheduleRouter from '../app/site/routes/schedule.js';
import siteNewsRouter from '../app/site/routes/news.js';

// ADMIN routes
import adminHomeRouter from '../app/admin/routes/home.js';
import adminContactRouter from '../app/admin/routes/contact.js';
import adminMembersRouter from '../app/admin/routes/members.js';
import adminScheduleRouter from '../app/admin/routes/schedule.js';
import adminMusic from '../app/admin/routes/music.js';
import adminbookings from '../app/admin/routes/bookings.js';
import adminnews from '../app/admin/routes/news.js';
import adminAuthRouter from '../app/admin/routes/auth.js';
import adminUsersRouter from '../app/admin/routes/users.js'; // Đã thêm
import { requireLogin, requireAdmin } from '../app/middleware/authMiddleware.js'; //

const router = express.Router();

// SITE routes
router.get('/', (req, res) => {
    res.render('home', { layout: false }); // Trang chủ (nếu có)
});
router.use('/contact', siteContactRouter);
router.use('/booking', siteBookingRouter);
router.use('/members', siteMembersRouter);
router.use('/music', siteMusicRouter);
router.use('/news', siteNewsRouter);
router.use('/schedule', siteScheduleRouter);

// ADMIN routes
router.use('/admin/auth', adminAuthRouter);
router.use('/admin', requireLogin, adminHomeRouter); // Áp dụng requireLogin cho tất cả /admin
router.use('/admin/contacts', requireLogin, adminContactRouter);
router.use('/admin/members', requireLogin, adminMembersRouter);
router.use('/admin/schedule', requireLogin, adminScheduleRouter);
router.use('/admin/music', requireLogin, adminMusic);
router.use('/admin/bookings', requireLogin, adminbookings);
router.use('/admin/news', requireLogin, adminnews);
router.use('/admin/users', requireLogin, requireAdmin, adminUsersRouter); // Cần cả requireLogin và requireAdmin


export default router;