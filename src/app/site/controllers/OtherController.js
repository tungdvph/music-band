// src/app/site/controllers/OtherController.js

export const index = (req, res) => {
    res.render('site/other/index', { title: 'Khác' }); // Nếu có trang "other"
};