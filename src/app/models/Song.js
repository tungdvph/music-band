// src/app/models/Song.js
import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const SongSchema = new Schema({
    title: { type: String, required: true },
    artist: { type: String }, // Hoặc có thể liên kết đến Member hoặc Band
    audioUrl: { type: String }, // URL đến file audio
    lyrics: { type: String },
    slug: { type: String, slug: "title", unique: true }
    // Các trường khác
}, {
    timestamps: true
});

const Song = mongoose.model('Song', SongSchema);
export default Song;