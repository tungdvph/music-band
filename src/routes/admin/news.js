// src/routes/admin/news.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/news/index', { title: 'Quản lý Tin Tức', layout: 'admin' });
});

export default router;