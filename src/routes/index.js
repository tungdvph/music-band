// src/routes/index.js
import express from 'express';

// ADMIN routes
import adminHomeRouter from '../app/admin/routes/home.js';
import adminContactRouter from '../app/admin/routes/contact.js';
import adminMembersRouter from '../app/admin/routes/members.js';
import adminScheduleRouter from '../app/admin/routes/schedule.js';
import adminMusic from '../app/admin/routes/music.js';
import adminbookings from '../app/admin/routes/bookings.js';
import adminnews from '../app/admin/routes/news.js';
import adminAuthRouter from '../app/admin/routes/auth.js';
import adminUsersRouter from '../app/admin/routes/users.js';
import { requireLogin, requireAdmin, requireUser } from '../app/middleware/authMiddleware.js'; // Import requireUser
import * as MusicController from '../app/admin/controllers/MusicController.js';
import * as NewsController from '../app/admin/controllers/NewsController.js';
import * as ScheduleController from '../app/admin/controllers/ScheduleController.js';
import * as BookingController from '../app/admin/controllers/BookingController.js';
import * as MemberController from '../app/admin/controllers/MembersController.js';
import * as ContactController from '../app/admin/controllers/ContactController.js';
import * as AuthClientController from '../app/admin/controllers/AuthClientController.js';

const router = express.Router();

// ADMIN routes
router.use('/admin/auth', adminAuthRouter); // Route đăng nhập/xuất cho admin (không cần middleware bảo vệ)
router.use('/admin', requireAdmin, adminHomeRouter); // Tất cả các route trong adminHomeRouter đều cần quyền admin
router.use('/admin/contacts', requireAdmin, adminContactRouter); // Cần quyền admin
router.use('/admin/members', requireAdmin, adminMembersRouter);  // Cần quyền admin
router.use('/admin/schedule', requireAdmin, adminScheduleRouter); // Cần quyền admin
router.use('/admin/music', requireAdmin, adminMusic);          // Cần quyền admin
router.use('/admin/bookings', requireAdmin, adminbookings);     // Cần quyền admin
router.use('/admin/news', requireAdmin, adminnews);            // Cần quyền admin
router.use('/admin/users', requireAdmin, adminUsersRouter);    // Cần quyền admin (đã đúng)

// API endpoints
router.get('/api/songs', MusicController.getSongsForClient);      // Public
router.get('/api/news', NewsController.getNewsForClient);         // Public
router.get('/api/news/:slug', NewsController.getNewsDetail);      // Public
router.get('/api/schedules', ScheduleController.getScheduleForClient); // Public
router.get('/api/schedules/:slug', ScheduleController.getScheduleDetail); // Public
router.post('/api/bookings', requireUser, BookingController.createBooking); // Chỉ user đã đăng nhập mới được đặt lịch
router.get('/api/members', MemberController.getMembersForClient); // Public
router.get('/api/members/:slug', MemberController.getMemberDetail); // Public
router.post('/api/contacts', ContactController.createContact);   // Public (hoặc requireUser nếu bạn muốn)

router.post('/api/register', AuthClientController.register);       // Đăng ký (public)
router.post('/api/login', AuthClientController.login);           // Đăng nhập (public)
router.get('/api/logout', AuthClientController.logout);            // Đăng xuất (cần requireLogin, vì chỉ người đã đăng nhập mới đăng xuất được)


// Error handling middleware (PHẢI đặt cuối cùng)
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Có lỗi xảy ra ở server!' });
});

export default router;