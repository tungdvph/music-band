// src/app/controllers/MusicController.js
import MusicService from '../services/MusicService.js'; // Import

export const index = async (req, res) => {
    try {
        const songs = await MusicService.getAllSongs(); // Sử dụng service
        res.render('music/index', { title: 'Âm nhạc', songs: songs });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).render('error', { message: 'Lỗi.' });
    }
};

export const show = async (req, res) => {
    try {
        const song = await MusicService.getSongBySlug(req.params.slug); // Sử dụng service
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy.' });
        }
        res.render('music/show', { title: song.title, song });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).render('error', { message: 'Lỗi.' });
    }
};

export const create = (req, res) => {
    res.render('music/create', { title: 'Thêm mới' });
};

export const store = async (req, res) => {
    try {
        const newSong = await MusicService.createSong(req.body); // Sử dụng service
        res.redirect('/music');
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).render('error', { message: "Lỗi." });
    }
};

export const edit = async (req, res) => {
    try {
        const song = await MusicService.getSongBySlug(req.params.slug); // Sử dụng service
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy.' });
        }
        res.render('music/edit', { title: "Chỉnh sửa", song: song });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).render("error", { message: "Lỗi." });
    }
};

export const update = async (req, res) => {
    try {
        const updatedSong = await MusicService.updateSong(req.params.slug, req.body); // Sử dụng service
        if (!updatedSong) {
            return res.status(404).render('error', { message: 'Không tìm thấy.' });
        }
        res.redirect(`/music/${updatedSong.slug}`);
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).render('error', { message: 'Lỗi.' });
    }
};

export const destroy = async (req, res) => {
    try {
        const result = await MusicService.deleteSong(req.params.slug);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát' })
        }
        res.redirect('/music');
    } catch (error) {
        console.error("Lỗi khi xóa bài hát", error);
        res.status(500).render('error', { message: 'Lỗi server' })
    }
}