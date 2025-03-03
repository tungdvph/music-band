// src/app/admin/services/MusicService.js
import Song from '../../models/Song.js';
import path from 'path'; // Import path

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

    async createSong(songData, req) {
        try {
            let imagePath = null;
            let audioPath = null;

            if (req.files) {
                if (req.files.image) {
                    imagePath = path.join('uploads', req.files.image[0].filename).replace(/\\/g, "/");
                }
                if (req.files.audio) {
                    audioPath = path.join('uploads', req.files.audio[0].filename).replace(/\\/g, "/");
                }
            }

            const newData = {
                ...songData,
                imageUrl: imagePath,
                audioUrl: audioPath,
            };

            const newSong = new Song(newData);
            return await newSong.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("Tên bài hát đã tồn tại");
            }
            throw new Error('Lỗi khi tạo bài hát: ' + error.message);
        }
    }

    async updateSong(slug, songData, req) {
        try {
            let imagePath = null;
            let audioPath = null;

            if (req.files) {
                if (req.files.image) {
                    imagePath = path.join('uploads', req.files.image[0].filename).replace(/\\/g, "/");
                }
                if (req.files.audio) {
                    audioPath = path.join('uploads', req.files.audio[0].filename).replace(/\\/g, "/");
                }
            }
            const newData = {
                ...songData,
                imageUrl: imagePath || songData.imageUrl, // Giữ nguyên nếu không có ảnh mới
                audioUrl: audioPath || songData.audioUrl, // Giữ nguyên nếu không có audio mới
            }

            return await Song.findOneAndUpdate({ slug }, newData, { new: true, runValidators: true }).lean();
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
        } catch (error) {
            throw new Error('Lỗi khi xóa bài hát: ' + error.message);
        }
    }

    async getTotalSongs() {
        try {
            const count = await Song.countDocuments();
            return count;
        } catch (error) {
            throw new Error('Lỗi khi đếm số lượng bài hát: ' + error.message);
        }
    }
}

export default new MusicService();