// src/app/models/Contact.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }, // Thêm trường số điện thoại (tùy chọn)
    subject: { type: String }, // Thêm trường tiêu đề
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'processing', 'replied', 'closed'], default: 'new' }, // Thêm trạng thái
    isRead: {type: Boolean, default: false}, //Đánh dấu đã đọc/chưa

}, {
    timestamps: true,
});

const Contact = mongoose.model('Contact', ContactSchema);
export default Contact;