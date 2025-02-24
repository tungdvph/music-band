import express from 'express';
const router = express.Router();
router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Đăng nhập' });
});

router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Đăng ký' });
});
export default router;