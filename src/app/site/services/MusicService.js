import Song from '../../models/Song.js';

class MusicService { // Đã sửa tên class
    async getAllSongs() {
        try {
            return await Song.find({}).lean(); // Hoặc thêm điều kiện (ví dụ: chỉ lấy bài hát đã được publish)
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách bài hát: ' + error.message);
        }
    }

    async getSongBySlug(slug) {
        try {
            return await Song.findOne({ slug }).lean(); // Có thể thêm điều kiện
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin bài hát: ' + error.message);
        }
    }

    // ... các phương thức khác nếu cần cho phần site (nhưng KHÔNG có create, update, delete)
}
export default new MusicService(); // Đã sửa tên class khi export