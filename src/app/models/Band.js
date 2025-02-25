// src/app/models/Band.js
import mongoose from 'mongoose';
// import slug from 'mongoose-slug-generator';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
const Schema = mongoose.Schema;
const BandSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    // Các trường khác liên quan đến band nhạc
    slug: { type: String, slug: "name", unique: true }
}, {
    timestamps: true
});

const Band = mongoose.model('Band', BandSchema);
export default Band;