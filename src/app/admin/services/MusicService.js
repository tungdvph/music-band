// src/app/admin/services/MusicService.js
import Song from '../../models/Song.js';

class MusicService {
    async getAllSongs() {
        try {
            return await Song.find({}).lean();
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách bài hát: ' + error.message);
        }
    }

    async getSongBySlug(slug) {
        try {
            return await Song.findOne({ slug }).lean();
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin bài hát: ' + error.message);
        }
    }

    async createSong(songData) {
        try {
            const newSong = new Song(songData);
            return await newSong.save();
        } catch (error) {
            // Xử lý lỗi (ví dụ: trùng tên bài hát)
            if (error.code === 11000) {
                throw new Error("Tên bài hát đã tồn tại");
            }
            throw new Error('Lỗi khi tạo bài hát: ' + error.message);
        }
    }

    async updateSong(slug, songData) {
        try {
            return await Song.findOneAndUpdate({ slug }, songData, { new: true, runValidators: true }).lean();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new Error("Tên bài hát đã tồn tại");
            }
            throw new Error('Lỗi khi cập nhật bài hát: ' + error.message);
        }
    }

    async deleteSong(slug) {
        try {
            return await Song.findOneAndDelete({ slug });
        }
        catch (error) {
            throw new Error('Lỗi khi xóa bài hát: ' + error.message);
        }
    }

    // Thêm phương thức getTotalSongs()
    async getTotalSongs() {
        try {
            const count = await Song.countDocuments();
            return count;
        } catch (error) {
            throw new Error('Lỗi khi thống kê số lượng bài hát: ' + error.message);
        }
    }
}

export default new MusicService();