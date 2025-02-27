// src/app/adminControllers/MusicController.js
import MusicService from '../services/MusicService.js';
import { validationResult } from 'express-validator'; // Nếu bạn muốn validate dữ liệu

class MusicController {
    async index(req, res) {
        try {
            const songs = await MusicService.getAllSongs();
            res.render('admin/music/index', { title: 'Quản lý Bài Hát', songs, layout: 'admin' });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Lỗi khi tải danh sách bài hát', layout: 'admin' });
        }
    }

    async create(req, res) {
        res.render('admin/music/create', { title: 'Thêm Bài Hát', layout: 'admin' });
    }

    async store(req, res) {
        // Thêm validation nếu cần
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('admin/music/create', {
                title: 'Thêm Bài Hát',
                errors: errors.array(),
                song: req.body, // Để giữ lại dữ liệu đã nhập
                layout: 'admin'
            });
        }
        try {
            const newSong = await MusicService.createSong(req.body);
            res.redirect('/admin/music'); // Chuyển hướng về trang danh sách
        } catch (error) {
            console.error(error);
            res.status(500).render('admin/music/create', { // Hiển thị lại form với thông báo lỗi
                title: 'Thêm Bài Hát',
                song: req.body,
                errors: [{ msg: error.message }], // Thông báo lỗi chung, hoặc lỗi cụ thể từ service
                layout: 'admin'
            });
        }
    }

    async show(req, res) {
        try {
            const song = await MusicService.getSongBySlug(req.params.slug);
            if (!song) {
                return res.status(404).render('error', { message: 'Không tìm thấy bài hát', layout: 'admin' });
            }
            res.render('admin/music/show', { title: song.title, song, layout: 'admin' });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
        }
    }
    async edit(req, res) {
        try {
            const song = await MusicService.getSongBySlug(req.params.slug);
             if (!song) {
                return res.status(404).render('error', { message: 'Không tìm thấy bài hát', layout: 'admin' });
            }
            res.render('admin/music/edit', { title: 'Chỉnh sửa bài hát', song, layout: 'admin' });
        } catch (error) {
            console.error(error);
             res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
        }
    }

    async update(req, res) {
          // Thêm validation nếu cần
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const song = await MusicService.getSongBySlug(req.params.slug);
            return res.status(400).render('admin/music/edit', {
                title: 'Chỉnh sửa bài hát',
                errors: errors.array(),
                song,
                layout: 'admin'
            })
        }
        try {
            const updatedSong = await MusicService.updateSong(req.params.slug, req.body);
             if (!updatedSong) {
                return res.status(404).render('error', { message: 'Không tìm thấy bài hát', layout: 'admin' });
            }
            res.redirect('/admin/music');
        } catch (error) {
            console.error(error);
            const song = await MusicService.getSongBySlug(req.params.slug);
            res.status(500).render('admin/music/edit', { // Hiển thị lại form với thông báo lỗi
                title: 'Chỉnh sửa Bài Hát',
                song,
                errors: [{ msg: error.message }], // Thông báo lỗi chung, hoặc lỗi cụ thể từ service
                layout: 'admin'
            });
        }
    }

     async confirmDelete(req, res) {
        try {
            const song = await MusicService.getSongBySlug(req.params.slug);
            if (!song) {
                return res.status(404).render('error', { message: 'Không tìm thấy bài hát', layout: 'admin' });
            }
            res.render('admin/music/confirm-delete', { title: 'Xác nhận xóa', song, layout: 'admin' });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
        }
    }

    async destroy(req, res) {
        try{
            const result = await MusicService.deleteSong(req.params.slug);
            if (!result) {
                return res.status(404).render('error', { message: 'Không tìm thấy bài hát', layout: 'admin' });
            }
            res.redirect('/admin/music');
        }
        catch(error){
            console.error(error);
            res.status(500).render('error', {message: 'Lỗi server', layout: 'admin'})
        }
    }
}

export default new MusicController();