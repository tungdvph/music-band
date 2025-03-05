// src/app/models/Booking.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    eventType: { type: String, required: true }, // Loại sự kiện
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    venue: { type: String, required: true },
    duration: { type: Number }, // Số giờ
    audienceSize: { type: Number },
    requirements: { type: String },
    budget: { type: Number },
    contactName: { type: String, required: true },  // Tên người liên hệ
    contactEmail: { type: String, required: true }, // Email
    contactPhone: { type: String, required: true }, // Số điện thoại
    message: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
    band: { type: Schema.Types.ObjectId, ref: 'Band' }, // (tùy chọn)
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // (tùy chọn, nếu có user)
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;