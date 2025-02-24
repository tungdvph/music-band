// src/routes/music.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('music/index', { title: 'Âm nhạc' });
});

router.get('/:slug', (req, res) => {
    const songSlug = req.params.slug;
    res.render('music/show', { title: 'Bài hát', slug: songSlug });
});

export default router;