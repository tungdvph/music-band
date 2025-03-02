// src/app/admin/controllers/MusicController.js
import AdminMusicService from '../services/MusicService.js';
import { validationResult } from 'express-validator';

export const index = async (req, res, next) => {
    try {
        const songs = await AdminMusicService.getAllSongs();
        res.render('music/index', { title: 'Quản lý bài hát', songs: songs, layout: 'admin' }); // Sửa đường dẫn
    } catch (error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const song = await AdminMusicService.getSongBySlug(req.params.slug);
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát' });
        }
        res.render('music/show', { title: song.title, song, layout: 'admin' }); // Sửa đường dẫn
    } catch (error) {
        next(error);
    }
};
export const create = (req, res) => {
    res.render('music/create', { title: 'Thêm mới bài hát', layout: 'admin' }); // Sửa đường dẫn
};

export const store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('music/create', { // Sửa đường dẫn
            title: 'Thêm mới bài hát',
            errors: errors.array(),
            song: req.body, //data
            layout: 'admin'
        });
    }
    try {
        const newSong = await AdminMusicService.createSong(req.body);
        res.redirect('/admin/music');
    } catch (error) {
        next(error)
    }
};

export const edit = async (req, res, next) => {
    try {
        const song = await AdminMusicService.getSongBySlug(req.params.slug);
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát' });
        }
        res.render('music/edit', { title: "Chỉnh sửa bài hát", song: song, layout: 'admin' }); // Sửa đường dẫn
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const song = await AdminMusicService.getSongBySlug(req.params.slug); // Lấy lại thông tin
        return res.status(400).render('music/edit', { // Sửa đường dẫn view
            title: 'Chỉnh sửa bài hát',
            errors: errors.array(),
            song: song,
            layout: 'admin'

        });
    }
    try {
        const updatedSong = await AdminMusicService.updateSong(req.params.slug, req.body);
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
        const song = await AdminMusicService.getSongBySlug(req.params.slug);
        if (!song) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát.' })
        }
        res.render('music/confirm-delete', { title: 'Xóa bài hát', song: song, layout: 'admin' }) // Sửa đường dẫn
    } catch (error) {
        next(error)
    }
}
export const destroy = async (req, res, next) => {
    try {
        const result = await AdminMusicService.deleteSong(req.params.slug);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài hát' })
        }
        res.redirect('/admin/music');
    } catch (error) {
        next(error)
    }
}