import News from '../../models/News.js';

class NewsService {
    async getLatestNews(limit = 5, skip = 0) { // Thêm tham số skip
        try {
            const news = await News.find({})
                .sort({ createdAt: -1 })
                .skip(skip) // Sử dụng skip
                .limit(limit)
                .populate('author')
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

    async getTotalNewsCount() { // Thêm hàm đếm tổng số tin
        try {
            return await News.countDocuments({});
        } catch (error) {
            throw new Error('Lỗi khi đếm số lượng tin tức: ' + error.message);
        }
    }
}

export default new NewsService();