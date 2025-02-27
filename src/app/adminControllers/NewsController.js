import NewsService from '../services/NewsService.js';
import { validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads/news'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

class NewsController {
    async index(req, res) {
        try {
            const news = await NewsService.getAllNews();
            res.render('admin/news/index', { title: 'Quản lý Tin Tức', news, layout: 'admin' });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Lỗi khi tải danh sách tin tức', layout: 'admin' });
        }
    }

    async create(req, res) {
        res.render('admin/news/create', { title: 'Thêm Tin Tức', news: {}, layout: 'admin' });
    }

    async store(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('admin/news/create', {
                title: 'Thêm Tin Tức',
                news: req.body,
                errors: errors.array(),
                layout: 'admin'
            });
        }

        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).render('admin/news/create', {
                    title: 'Thêm Tin Tức',
                    news: req.body,
                    errors: [{ msg: 'Lỗi upload file: ' + err.message }],
                    layout: 'admin'
                });
            }

            try {
                if (req.file) {
                    req.body.image = '/uploads/news/' + req.file.filename;
                }

                const newNews = await NewsService.createNews(req.body);
                res.redirect('/admin/news');


            } catch (error) {
                console.error(error);
                res.status(500).render('admin/news/create', {
                    title: 'Thêm Tin Tức',
                    news: req.body,
                    errors: [{ msg: error.message }],
                    layout: 'admin'
                });
            }
        });
    }

    async show(req, res) {
        try {
            const newsItem = await NewsService.getNewsBySlug(req.params.slug);
            if (!newsItem) {
                return res.status(404).render('error', { message: 'Không tìm thấy tin tức', layout: 'admin' });
            }
            res.render('admin/news/show', { title: newsItem.title, news: newsItem, layout: 'admin' });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
        }
    }

    async edit(req, res) {
        try {
            const newsItem = await NewsService.getNewsBySlug(req.params.slug);
            if (!newsItem) {
                return res.status(404).render('error', { message: 'Không tìm thấy tin tức', layout: 'admin' });
            }
            // console.log("newsItem:", newsItem); // Removed console.log
            res.render('admin/news/edit', { title: 'Chỉnh sửa Tin Tức', news: newsItem, layout: 'admin' });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
        }
    }


    async update(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const news = await NewsService.getNewsBySlug(req.params.slug);  //Re-fetch
            return res.status(400).render('admin/news/edit', {
                title: 'Chỉnh sửa Tin Tức',
                news, // Use re-fetched news
                errors: errors.array(),
                layout: 'admin'
            });
        }

        // Handle image upload BEFORE updating the news item.
        upload.single('image')(req, res, async (err) => { // Use upload middleware here
            if (err) {
                 console.error("Upload Error:", err);
                const news = await NewsService.getNewsBySlug(req.params.slug);
                return res.status(500).render('admin/news/edit', { // Re-render edit
                    title: 'Chỉnh sửa Tin Tức',
                    news, // Use re-fetched news
                    errors: [{ msg: 'Lỗi upload file: ' + err.message }],
                    layout: 'admin'
                });
            }

            try {
                if (req.file) {
                    req.body.image = '/uploads/news/' + req.file.filename;
                }

                const updatedNews = await NewsService.updateNews(req.params.slug, req.body);
                if (!updatedNews) {
                    return res.status(404).render('error', { message: 'Không tìm thấy tin tức', layout: 'admin' });
                }
                res.redirect('/admin/news');
            } catch (error) {
                console.error(error);
                const news = await NewsService.getNewsBySlug(req.params.slug); // Re-fetch
                res.status(500).render('admin/news/edit', {
                    title: 'Chỉnh sửa Tin Tức',
                    news,  // Re-fetched
                    errors: [{ msg: error.message }],
                    layout: 'admin'
                });
            }
        });
    }



    async confirmDelete(req, res) {
        try {
            const news = await NewsService.getNewsById(req.params.id);
            if (!news) {
                return res.status(404).render('error', { message: 'Không tìm thấy bài viết', layout: 'admin' });
            }
            res.render('admin/news/confirm-delete', { title: 'Xác nhận xóa', news, layout: 'admin' });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
        }
    }

    async destroy(req, res) {
        try {
            const result = await NewsService.deleteNews(req.params.id);
            if (!result) {
                return res.status(404).render('error', { message: 'Không tìm thấy tin tức', layout: 'admin' });
            }
            res.redirect('/admin/news');
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
        }
    }
}

export default new NewsController();