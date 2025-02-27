import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
const Schema = mongoose.Schema;
const NewsSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Nội dung bài viết
    description: { type: String }, // Add description
    image: { type: String },  // URL ảnh
    author: { type: Schema.Types.ObjectId, ref: 'User' }, // Tham chiếu đến người viết (nếu có)
    slug: { type: String, slug: "title", unique: true }
}, {
    timestamps: true
});

const News = mongoose.model('News', NewsSchema);
export default News;