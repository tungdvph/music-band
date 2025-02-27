// src/routes/admin/music.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/music/index', { title: 'Quản lý Bài Hát', layout: 'admin' });
});

export default router;