// src/app/models/Booking.js

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    band: { type: Schema.Types.ObjectId, ref: 'Band' },
    user: { type: Schema.Types.ObjectId, ref: 'User' }, // Liên kết với User (nếu có)
    venue: { type: String },
    date: { type: Date },
    time: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }, // Trạng thái
    //Các trường khác
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;