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


const router = express.Router();

// SITE routes (Không cần middleware để set views ở đây)
router.get('/', (req, res) => {
    res.render('home', { layout: false }); // Trang chủ (nếu có)
});
router.use('/contact', siteContactRouter);
router.use('/booking', siteBookingRouter);
router.use('/members', siteMembersRouter);
router.use('/music', siteMusicinRouter);
router.use('/news', siteNewsRouter);
router.use('/schedule', siteScheduleRouter);

// ADMIN routes (Không cần middleware để set views ở đây)
router.use('/admin', adminHomeRouter);
router.use('/admin/contacts', adminContactRouter);
router.use('/admin/members', adminMembersRouter);
router.use('/admin/schedule', adminScheduleRouter);
router.use('/admin/music', adminMusic);
router.use('/admin/bookings', adminbookings);
router.use('/admin/news', adminnews);
router.use('/admin/users', adminUsersRouter);
router.use('/admin/auth', adminAuthRouter);
export default router;