// src/app/admin/controllers/MusicController.js
import MusicService from '../services/MusicService.js'; // Sửa import
import { validationResult } from 'express-validator';
import Song from '../../models/Song.js';

export const index = async (req, res, next) => {
    try {
        const musicService = new MusicService(); // Tạo instance
        const songs = await musicService.getAllSongs();
        res.render('music/index', { title: 'Quản lý bài hát', songs: songs, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const musicService = new MusicService(); // Tạo instance
        const song = await musicService.getSongBySlug(req.params.slug);
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát' });
        }
        res.render('music/show', { title: song.title, song, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const create = (req, res) => {
    res.render('music/create', { title: 'Thêm mới bài hát', layout: 'admin' });
};

export const store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('music/create', {
            title: 'Thêm mới bài hát',
            errors: errors.array(),
            song: req.body,
            layout: 'admin'
        });
    }
    try {
        const musicService = new MusicService(); // Tạo instance
        const newSong = await musicService.createSong(req.body, req); // Truyền req
        res.redirect('/admin/music');
    } catch (error) {
        next(error)
    }
};

export const edit = async (req, res, next) => {
    try {
        const musicService = new MusicService(); // Tạo instance
        const song = await musicService.getSongBySlug(req.params.slug);
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát' });
        }
        res.render('music/edit', { title: "Chỉnh sửa bài hát", song: song, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Lấy lại thông tin bài hát để hiển thị lại form
        const musicService = new MusicService(); // Phải có instance để gọi getSongBySlug
        const song = await musicService.getSongBySlug(req.params.slug);
        return res.status(400).render('music/edit', {
            title: 'Chỉnh sửa bài hát',
            errors: errors.array(),
            song: song, // Truyền lại thông tin bài hát
            layout: 'admin'
        });
    }
    try {
        const musicService = new MusicService();  // Tạo instance
        const updatedSong = await musicService.updateSong(req.params.slug, req.body, req); // Truyền req
        if (!updatedSong) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát' });
        }
        res.redirect(`/admin/music/${updatedSong.slug}`);
    } catch (error) {
        next(error);
    }
};

export const confirmDelete = async (req, res, next) => {
    try {
        const musicService = new MusicService(); // Tạo instance
        const song = await musicService.getSongBySlug(req.params.slug);
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát.' })
        }
        res.render('music/confirm-delete', { title: 'Xóa bài hát', song: song, layout: 'admin' })
    } catch (error) {
        next(error)
    }
}
export const destroy = async (req, res, next) => {
    try {
        const musicService = new MusicService(); // Tạo instance
        const result = await musicService.deleteSong(req.params.slug);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát' })
        }
        res.redirect('/admin/music');
    } catch (error) {
        next(error)
    }
}

// Thêm hàm này:
export const getSongsForClient = async (req, res) => {
    try {
        const musicService = new MusicService(); // Tạo instance
        const songs = await musicService.getAllSongs(); // Sửa: Gọi qua instance
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách bài hát.' });
    }
};