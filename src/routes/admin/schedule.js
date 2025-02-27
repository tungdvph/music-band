// src/routes/admin/schedule.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/schedule/index', { title: 'Quản lý Lịch Trình', layout: 'admin' });
});

export default router;