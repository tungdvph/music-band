import News from '../models/News.js';

class NewsService {
    async getAllNews() {
        try {
            const news = await News.find({}).populate('author').lean();
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
    async getNewsById(id) {
        try {
            const newsItem = await News.findById(id).populate('author').lean();
            return newsItem
        } catch (error) {
            throw new Error('Lỗi khi lấy bài viết: ' + error.message)
        }
    }

    async createNews(newsData) {
        try {
            const newNews = new News(newsData);
            await newNews.save();
            return newNews.toObject();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("Tiêu đề đã tồn tại")
            }
            throw new Error('Lỗi khi tạo tin tức: ' + error.message);
        }
    }

    async updateNews(slug, updateData) { // Changed parameter to 'slug'
        try {
            // Find by slug, not ID
            const updatedNews = await News.findOneAndUpdate({ slug: slug }, updateData, { new: true, runValidators: true }).lean();
            return updatedNews;
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("Tiêu đề đã tồn tại")
            }
            throw new Error('Lỗi khi cập nhật tin tức: ' + error.message);
        }
    }


    async deleteNews(id) {
        try {
            const result = await News.findByIdAndDelete(id);
            return result
        } catch (error) {
            throw new Error('Lỗi khi xóa tin tức: ' + error.message);
        }
    }
}

export default new NewsService();