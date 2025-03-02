// src/routes/admin.js
import express from 'express';

const router = express.Router();

// Định nghĩa các routes cho admin ở đây.  Ví dụ:

// Lấy danh sách tất cả users (admin)
router.get('/users', (req, res) => {
    // TODO: Thay thế bằng controller function thực tế
    res.send('Danh sách users (admin)');
});

// Tạo user mới (admin)
router.post('/users', (req, res) => {
    // TODO: Thay thế bằng controller function thực tế
    res.send('Tạo user mới (admin)');
});

// Lấy thông tin chi tiết của một bài viết (admin/news/:id)
router.get('/news/:id', (req, res) => {
    //TODO: thay thế bằng controller function
    res.send('Chi tiết bài viết' + req.params.id)
})

// Các routes khác cho admin (products, orders, settings, ...)
// ...

export default router;