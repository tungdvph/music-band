// src/app/site/controllers/MusicController.js
import SiteMusicService from '../services/SiteMusicService.js'; // Sửa đường dẫn CHÍNH XÁC

export const index = async (req, res, next) => {
    try {
        const songs = await SiteMusicService.getAllSongs();
        res.render('site/music/index', { title: 'Âm nhạc', songs: songs, layout: false }); //layout: false
    } catch (error) {
        next(error)
    }
};

export const show = async (req, res, next) => {
    try {
        const song = await SiteMusicService.getSongBySlug(req.params.slug);
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát.', layout: false }); //layout: false
        }
        res.render('site/music/show', { title: song.title, song, layout: false });//layout: false
    } catch (error) {
        next(error)
    }
};