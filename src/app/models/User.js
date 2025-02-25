// src/app/models/User.js

import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String },
    role: { type: String, enum: ['admin', 'user', 'member'], default: 'user' },
    slug: { type: String, slug: 'username', unique: true },
    // Các trường khác
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;