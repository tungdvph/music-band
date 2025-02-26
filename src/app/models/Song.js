// src/app/models/Song.js
import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: { type: String, required: true },
    artist: { type: String }, // Hoặc: { type: Schema.Types.ObjectId, ref: 'Artist' }
    audioUrl: { type: String, required: true }, // Bắt buộc phải có URL
    imageUrl: { type: String }, // Thêm trường image
    lyrics: { type: String },
    slug: { type: String, slug: "title", unique: true }
    // Các trường khác
}, {
    timestamps: true
});

const Song = mongoose.model('Song', SongSchema);
export default Song;