//src/routes/booking.js
import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    res.render('booking/index', { title: 'Đặt lịch' });
});
export default router;