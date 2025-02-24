// src/app/models/News.js
import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);
const Schema = mongoose.Schema;
const NewsSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, require: true },
    image: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    slug: { type: String, slug: "title", unique: true }
}, {
    timestamps: true
});

const News = mongoose.model('News', NewsSchema);
export default News;