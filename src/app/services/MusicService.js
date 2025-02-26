// src/app/services/MusicService.js
import Song from '../models/Song.js';

class MusicService {
    async getAllSongs() {
        return await Song.find({}).lean();
    }

    async getSongBySlug(slug) {
        return await Song.findOne({ slug }).lean();
    }

    async createSong(songData) {
        const newSong = new Song(songData);
        return await newSong.save();
    }

    async updateSong(slug, songData) {
        return await Song.findOneAndUpdate({ slug }, songData, { new: true }).lean();
    }

    async deleteSong(slug) {
        return await Song.findOneAndDelete({ slug });
    }
}

export default new MusicService();