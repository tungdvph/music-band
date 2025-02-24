// src/routes/schedule.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('schedule/index', { title: 'Lịch trình' });
});
export default router;