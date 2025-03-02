// src/app/site/services/SiteNewsService.js
import News from '../../models/News.js';

class SiteNewsService {
    async getLatestNews(limit = 5) { // Mặc định lấy 5 bài mới nhất
        try {
            const news = await News.find({})
                .sort({ createdAt: -1 }) // Mới nhất lên trên
                .limit(limit)
                .populate('author') // Nếu bạn muốn hiển thị thông tin tác giả
                .lean();
            return news;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách tin tức: ' + error.message);
        }
    }

    async getNewsBySlug(slug) {
        try {
            const newsItem = await News.findOne({ slug }).populate('author').lean();
            return newsItem;
        } catch (error) {
            throw new Error('Lỗi khi lấy tin tức: ' + error.message);
        }
    }
}

export default new SiteNewsService();