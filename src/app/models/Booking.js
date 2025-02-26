// src/app/models/Booking.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    name: { type: String, required: true }, // Thêm trường này
    email: { type: String, required: true }, // Thêm trường này
    phone: { type: String, required: true },  // Thêm trường này
    date: { type: Date, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    message: { type: String }, // Thêm trường này
    status: { type: String, enum: ['pending', 'confirmed', 'canceled'], default: 'pending' },
    band: { type: Schema.Types.ObjectId, ref: 'Band' }, // populate
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Liên kết với User (nếu có)
    // schedule: { type: Schema.Types.ObjectId, ref: 'Schedule' }, // Tùy chọn

}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;