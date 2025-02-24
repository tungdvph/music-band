// src/app/controllers/MusicController.js
import Song from '../models/Song.js';

export const index = async (req, res) => {
    try {
        const songs = await Song.find({}).lean(); // Lấy tất cả bài hát
        res.render('music/index', { title: 'Âm nhạc', songs: songs }); // Sửa thành songs: songs
    } catch (error) {
        console.error("Lỗi khi truy vấn danh sách bài hát:", error);
        res.status(500).render('error', { message: 'Lỗi khi tải trang nhạc.' }); // Nên có trang error.hbs
    }
};

export const show = async (req, res) => {
    try {
        const song = await Song.findOne({ slug: req.params.slug });
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát.' }); // 404 Not Found
        }
        res.render('music/show', {
            title: song.title, // Title của trang là tên bài hát
            song, // Truyền object song sang view
        });
    } catch (error) {
        console.error("Lỗi khi truy vấn bài hát:", error);
        res.status(500).render('error', { message: 'Lỗi server khi tải bài hát.' });
    }
};