// src/routes/site.js
import express from 'express';

const router = express.Router();

// Định nghĩa các routes cho site ở đây.  Ví dụ:

// Trang chủ
router.get('/', (req, res) => {
    // TODO: Thay thế bằng controller function thực tế
    res.send('Trang chủ');
});

// Trang giới thiệu
router.get('/about', (req, res) => {
    // TODO: Thay thế bằng controller function thực tế
    res.send('Trang giới thiệu');
});

// Trang liên hệ
router.get('/contact', (req, res) => {
    // TODO: Thay thế bằng controller function thực tế
    res.send('Trang liên hệ');
});
// Trang chi tiết bài viết (site/news/:slug)
router.get('/news/:slug', (req, res) => {
    // TODO: Thay thế bằng controller function thực tế
    res.send('Chi tiết bài viết News' + req.params.slug);
})
// Các routes khác cho site (products, blog, ...)
// ...

export default router;