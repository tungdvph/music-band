// src/app/models/Contact.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, require: true },
    subject: { type: String },
    message: { type: String, required: true },
}, {
    timestamps: true,
});

const Contact = mongoose.model('Contact', ContactSchema);
export default Contact;