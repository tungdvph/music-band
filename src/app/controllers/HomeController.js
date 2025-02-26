// src/app/controllers/HomeController.js
import Band from '../models/Band.js';
import Member from '../models/Member.js';
import Song from '../models/Song.js'; // Đảm bảo import đúng Song

export const home = async (req, res) => {
    try {
        const band = await Band.findOne({}).lean();
        const members = await Member.find({}).limit(4).lean(); // Lấy vài thành viên
        const songs = await Song.find({}).limit(4).lean(); // Lấy vài bài hát

        res.render('home', {
            title: "Trang chủ",
            band: band,
            members: members,
            songs: songs, // Truyền biến songs vào view
        });
    } catch (error) {
        console.error("Lỗi truy vấn dữ liệu:", error);
        res.status(500).render('error', { message: 'Lỗi khi tải trang chủ.' });
    }
};