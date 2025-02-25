// src/app/models/Member.js

import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name: { type: String, required: true },
    role: { type: String }, // Ví dụ: "Ca sĩ", "Guitarist", ...
    bio: { type: String },
    image: { type: String },
    band: { type: Schema.Types.ObjectId, ref: 'Band' }, // Liên kết đến Band
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
});

const Member = mongoose.model('Member', MemberSchema);

export default Member;