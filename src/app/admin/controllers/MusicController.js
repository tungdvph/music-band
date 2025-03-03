// src/app/admin/controllers/MusicController.js
import AdminMusicService from '../services/MusicService.js';
import { validationResult } from 'express-validator';

export const index = async (req, res, next) => {
    try {
        const songs = await AdminMusicService.getAllSongs();
        res.render('music/index', { title: 'Quản lý bài hát', songs: songs, layout: 'admin' });
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
        const newSong = await AdminMusicService.createSong(req.body, req); // Truyền req
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
        res.render('music/edit', { title: "Chỉnh sửa bài hát", song: song, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Lấy lại thông tin bài hát để hiển thị lại form với dữ liệu cũ
        const song = await AdminMusicService.getSongBySlug(req.params.slug);
        return res.status(400).render('music/edit', {
            title: 'Chỉnh sửa bài hát',
            errors: errors.array(),
            song: song, // Truyền lại thông tin bài hát
            layout: 'admin'
        });
    }
    try {
        const updatedSong = await AdminMusicService.updateSong(req.params.slug, req.body, req); // Truyền req
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
        res.render('music/confirm-delete', { title: 'Xóa bài hát', song: song, layout: 'admin' })
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