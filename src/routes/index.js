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
import adminUsersRouter from '../app/admin/routes/users.js'; // Đã thêm
import { requireLogin, requireAdmin } from '../app/middleware/authMiddleware.js'; //
import * as MusicController from '../app/admin/controllers/MusicController.js'; // Import MusicController
import * as NewsController from '../app/admin/controllers/NewsController.js'; // Import NewsController

const router = express.Router();


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

// API endpoints
router.get('/api/songs', MusicController.getSongsForClient);
router.get('/api/news', NewsController.getNewsForClient);
router.get('/api/news/:slug', NewsController.getNewsDetail);

export default router;