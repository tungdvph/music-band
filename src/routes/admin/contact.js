// src/routes/admin/contact.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/contacts/index', { title: 'Quản lý Liên Hệ', layout: 'admin' }); // Chú ý đường dẫn view
});

export default router;