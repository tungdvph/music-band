// src/app/admin/routes/other.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/other/index', { title: 'Quản lý Mục Khác', layout: 'admin' });
});

export default router;