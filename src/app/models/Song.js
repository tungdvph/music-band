// src/app/models/Song.js
import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    title: { type: String, required: true },
    artist: { type: String },
    audioUrl: { type: String, required: true }, // URL của file audio, bắt buộc
    imageUrl: { type: String },   // URL của ảnh bìa
    lyrics: { type: String },
    slug: { type: String, slug: 'title', unique: true },
}, {
    timestamps: true,
});

const Song = mongoose.model('Song', SongSchema);

export default Song;