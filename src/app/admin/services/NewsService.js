import News from '../../models/News.js';
import path from 'path'; // Import thư viện path (để xử lý đường dẫn)

class NewsService { // Bạn có thể dùng NewsService, tùy theo cách bạn đặt tên
    // Các hàm getAllNews, getNewsBySlug,  createNews, updateNews giữ nguyên.
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
    async createNews(newsData, req) { // Thêm tham số req
        try {
            console.log("req.file in createNews (start):", req.file);
            let imagePath = null;
            if (req.file) { // Kiểm tra xem có file upload không (req.file)
                // Tạo đường dẫn tương đối, an toàn, và tương thích đa nền tảng:
                imagePath = path.join('uploads', req.file.filename).replace(/\\/g, "/");
            }

            const newData = {
                ...newsData,  // Copy tất cả các trường từ newsData
                image: imagePath, // Ghi đè trường image bằng đường dẫn mới (hoặc null nếu không có file)
            };

            const newNews = new News(newData);
            await newNews.save();
            return newNews.toObject(); // Trả về object đã được lưu
        } catch (error) {
            if (error.code === 11000) { // Xử lý lỗi trùng slug (tùy chọn)
                throw new Error("Tiêu đề đã tồn tại");
            }
            throw new Error('Lỗi khi tạo tin tức: ' + error.message);
        }
    }

    async updateNews(slug, updateData, req) { // Thêm req
        try {
            console.log("req.file in updateNews (start):", req.file); // THÊM DÒNG NÀY
            let imagePath = null;
            if (req.file) { // Kiểm tra xem có file upload không
                // Tạo đường dẫn tương đối, an toàn, và tương thích đa nền tảng:
                imagePath = path.join('uploads', req.file.filename).replace(/\\/g, "/");
            }

            const newData = {
                ...updateData, // Copy tất cả các trường từ updateData
                image: imagePath || updateData.image, // Cập nhật ảnh mới, hoặc giữ nguyên ảnh cũ nếu không có ảnh mới
            };

            // Tìm và cập nhật tin tức theo slug, đảm bảo validation
            const updatedNews = await News.findOneAndUpdate({ slug: slug }, newData, { new: true, runValidators: true }).lean();
            return updatedNews;
        } catch (error) {
            if (error.code === 11000) { // Xử lý lỗi trùng slug (tùy chọn)
                throw new Error("Tiêu đề đã tồn tại");
            }
            throw new Error('Lỗi khi cập nhật tin tức: ' + error.message);
        }
    }
    async deleteNews(id) {
        try {
            const result = await News.findByIdAndDelete(id); // Tìm và xóa theo ID
            return result;
        } catch (error) {
            throw new Error('Lỗi khi xóa tin tức: ' + error.message);
        }
    }
}

export default new NewsService();