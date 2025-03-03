import NewsService from '../services/NewsService.js';

export const index = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1; // Trang mặc định là 1
        const limit = 5;
        const skip = (page - 1) * limit;

        const news = await NewsService.getLatestNews(limit, skip);
        const totalCount = await NewsService.getTotalNewsCount(); // Thêm hàm getTotalNewsCount
        const totalPages = Math.ceil(totalCount / limit);

        res.render('site/news/index', {
            title: 'Tin tức',
            news,
            page,
            totalPages,
            prevPage: (page) => page - 1,
            nextPage: (page, totalPages) => page < totalPages ? page + 1 : page,
            pages: (totalPages) => Array.from({ length: totalPages }, (_, i) => i + 1)
        });
    } catch (error) {
        next(error);
    }
};

export const show = async (req, res, next) => {
    try {
        const newsItem = await NewsService.getNewsBySlug(req.params.slug);
        if (!newsItem) {
            return res.status(404).render('error', { message: 'Không tìm thấy bài viết' });
        }
        res.render('site/news/show', {
            title: newsItem.title,
            newsItem: newsItem
        });
    } catch (error) {
        next(error);
    }
};