// src/app/site/controllers/NewsController.js
import SiteNewsService from '../services/SiteNewsService.js'; // Sửa đường dẫn

export const index = async (req, res, next) => {
    try {
        const news = await SiteNewsService.getLatestNews(); // Hoặc getAllNews(), tùy bạn
        res.render('site/news/index', { title: 'Tin tức', news });
    } catch (error) {
        next(error)
    }
};
export const show = async (req, res, next) => {
    try {
        const news = await SiteNewsService.getNewsBySlug(req.params.slug);
        if (!news) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài viết' })
        }
        res.render('site/news/show', { title: news.title, news: news })
    } catch (error) {
        next(error)
    }
}