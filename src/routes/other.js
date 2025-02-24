// src/routes/other.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('other', { title: 'Khác' });
});
export default router;