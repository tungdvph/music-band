// src/app/controllers/HomeController.js

import Band from '../models/Band.js'; // Import model Band

export const home = async (req, res) => {
    try {
        const band = await Band.findOne({}).lean(); // Thêm .lean() vào đây

        res.render('home', {
            title: "Trang chủ",
            band: band, // Truyền dữ liệu band sang view
        });
    } catch (error) {
        console.error("Lỗi truy vấn dữ liệu:", error);
        res.render('error', { message: 'Lỗi khi tải trang chủ.' }); // Xử lý lỗi
    }
};