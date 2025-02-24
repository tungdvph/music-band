//src/routes/contact.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('contact', { title: 'Liên hệ' }); // Hiển thị view contact.hbs
});
export default router;