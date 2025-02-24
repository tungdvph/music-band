// src/routes/news.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('news', { title: 'Tin tức' });
});
export default router;