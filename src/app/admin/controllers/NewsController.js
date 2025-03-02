// src/app/admin/controllers/NewsController.js
import AdminNewsService from '../services/NewsService.js';
import { validationResult } from 'express-validator';
import User from '../../models/User.js'; // Để lấy danh sách author

export const index = async (req, res, next) => {
    try {
        const news = await AdminNewsService.getAllNews();
        // Sửa đường dẫn view ở đây:
        res.render('news/index', { title: 'Quản lý tin tức', news: news, layout: 'admin' });
    } catch (error) {
        next(error)
    }
};

// ... (các hàm khác giữ nguyên) ...
//show
export const show = async (req, res, next) => {
    try {
        const news = await AdminNewsService.getNewsBySlug(req.params.slug);
        if (!news) {
            return res.status(404).render('error', { message: 'Không tìm thấy tin tức' });
        }
        res.render('news/show', { title: news.title, news: news, layout: 'admin' })
    } catch (error) {
        next(error)
    }
}
// Thêm tin tức
export const create = async (req, res, next) => {
    // Nếu bạn có hệ thống user và author, hãy populate danh sách authors ở đây
    // Ví dụ:
    // const authors = await User.find({ role: 'author' }).lean();
    // res.render('admin/news/create', { title: 'Thêm tin tức', authors: authors });
    const authors = await User.find({}).lean();
    res.render('news/create', { title: 'Thêm tin tức', authors: authors, layout: 'admin' });
};

export const store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const authors = await User.find({}).lean(); // Nếu bạn cần chọn author
        return res.status(400).render('admin/news/create', {
            title: 'Thêm tin tức',
            errors: errors.array(),
            news: req.body, // Để giữ lại dữ liệu đã nhập
            authors: authors,
            layout: 'admin'
        });
    }

    try {
        const newNews = await AdminNewsService.createNews(req.body);
        res.redirect('/admin/news'); // Chuyển hướng đến trang danh sách tin tức
    } catch (error) {
        next(error)
    }
};

// Sửa
export const edit = async (req, res, next) => {
    try {
        const news = await AdminNewsService.getNewsBySlug(req.params.slug);
        const authors = await User.find({}).lean(); // Nếu bạn cần chọn author
        if (!news) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài viết' });
        }
        res.render('news/edit', { title: 'Chỉnh sửa bài viết', news: news, authors: authors, layout: 'admin' });
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const news = await AdminNewsService.getNewsBySlug(req.params.slug);
        const authors = await User.find({}).lean();
        return res.status(400).render('admin/news/edit', {
            title: 'Chỉnh sửa bài viết',
            errors: errors.array(),
            news: news, // Để giữ lại dữ liệu đã nhập
            authors: authors,
            layout: 'admin'
        });
    }

    try {
        const updateNews = await AdminNewsService.updateNews(req.params.slug, req.body);
        if (!updateNews) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài viết' });
        }

        res.redirect(`/admin/news/${req.params.slug}`); // Chuyển hướng đến trang chi tiết
    } catch (error) {
        next(error);
    }
};

//xóa
export const confirmDelete = async (req, res, next) => {
    try {
        const news = await AdminNewsService.getNewsById(req.params.id); // Sửa thành getId

        if (!news) {
            return res.status(404).render('error', { message: 'Không tìm thấy tin tức' });
        }

        res.render('news/confirm-delete', { title: 'Xác nhận xóa', news: news, layout: 'admin' }); // Sửa đường dẫn view
    } catch (error) {
        next(error);
    }
};
export const destroy = async (req, res, next) => {
    try {
        const result = await AdminNewsService.deleteNews(req.params.id); //Sửa thành getId
        if (!result) {
            return res.status(404).render('error', { message: "Không tìm thấy tin tức" })
        }
        res.redirect('/admin/news') // Sửa đường dẫn
    } catch (error) {
        next(error);
    }
}