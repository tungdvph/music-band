// src/routes/home.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', { title: "Trang chủ" });
});

export default router; // Thêm dòng này