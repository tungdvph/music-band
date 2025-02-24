// src/routes/members.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('members/index', { title: 'Thành viên' }); // Hiển thị view members/index.hbs
});

router.get('/:slug', (req, res) => {
    // Ví dụ: /members/john-doe
    const memberSlug = req.params.slug;
    res.render('members/show', { title: 'Thành viên chi tiết', slug: memberSlug });
});

export default router; // Thêm dòng này