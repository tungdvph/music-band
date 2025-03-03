import AdminNewsService from '../services/NewsService.js';
import { validationResult } from 'express-validator';
import User from '../../models/User.js'; // Để lấy danh sách author

export const index = async (req, res, next) => {
    try {
        const news = await AdminNewsService.getAllNews();
        res.render('news/index', { title: 'Quản lý tin tức', news: news, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const news = await AdminNewsService.getNewsBySlug(req.params.slug);
        if (!news) {
            return res.status(404).render('error', { message: 'Không tìm thấy tin tức', layout: 'admin' });
        }
        res.render('news/show', { title: news.title, news: news, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    const authors = await User.find({}).lean();
    res.render('news/create', { title: 'Thêm tin tức', authors: authors, layout: 'admin' });
};

export const store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const authors = await User.find({}).lean();
        return res.status(400).render('news/create', {
            title: 'Thêm tin tức',
            errors: errors.array(),
            news: req.body,
            authors: authors,
            layout: 'admin'
        });
    }

    try {
        // console.log("req.body in store:", req.body); // Bỏ comment nếu muốn kiểm tra
        // console.log("req.file in store:", req.file); // Bỏ comment nếu muốn kiểm tra
        const newNews = await AdminNewsService.createNews(req.body, req); // TRUYỀN req VÀO
        res.redirect('/admin/news');
    } catch (error) {
        if (error.name === 'ValidationError') {
            const authors = await User.find({}).lean();
            const validationErrors = Object.values(error.errors).map(e => ({ msg: e.message }));
            return res.status(400).render('news/create', {
                title: 'Thêm tin tức',
                errors: validationErrors,
                news: req.body,
                authors: authors,
                layout: 'admin'
            });
        }
        next(error);
    }
};

export const edit = async (req, res, next) => {
    try {
        const news = await AdminNewsService.getNewsBySlug(req.params.slug);
        const authors = await User.find({}).lean();
        if (!news) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài viết', layout: 'admin' });
        }
        res.render('news/edit', { title: 'Chỉnh sửa bài viết', news: news, authors: authors, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Không cần thiết phải gọi lại getNewsBySlug ở đây.
        // Dữ liệu form đã có trong req.body
        const authors = await User.find({}).lean();
        return res.status(400).render('news/edit', {
            title: 'Chỉnh sửa bài viết',
            errors: errors.array(),
            news: req.body, // Sử dụng req.body để giữ lại dữ liệu đã nhập.
            authors: authors,
            layout: 'admin'
        });
    }

    try {
        // console.log("req.file in update:", req.file);
        const updatedNews = await AdminNewsService.updateNews(req.params.slug, req.body, req);
        if (!updatedNews) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài viết', layout: 'admin' });
        }
        res.redirect(`/admin/news/${updatedNews.slug}`); // Chuyển hướng đến trang chi tiết, dùng slug MỚI.
    } catch (error) {
        if (error.name === 'ValidationError') {
            const authors = await User.find({}).lean();
            const validationErrors = Object.values(error.errors).map(e => ({ msg: e.message }));
            return res.status(400).render('news/edit', {
                title: 'Chỉnh sửa bài viết',
                errors: validationErrors,
                news: req.body,  // Sử dụng req.body
                authors: authors,
                layout: 'admin'
            });
        }
        next(error);
    }
};

export const confirmDelete = async (req, res, next) => {
    try {
        const news = await AdminNewsService.getNewsById(req.params.id);
        if (!news) {
            return res.status(404).render('error', { message: 'Không tìm thấy tin tức', layout: 'admin' });
        }
        res.render('news/confirm-delete', { title: 'Xác nhận xóa', news: news, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

export const destroy = async (req, res, next) => {
    try {
        const result = await AdminNewsService.deleteNews(req.params.id);
        if (!result) {
            return res.status(404).render('error', { message: "Không tìm thấy tin tức", layout: 'admin' });
        }
        res.redirect('/admin/news');
    } catch (error) {
        next(error);
    }
};