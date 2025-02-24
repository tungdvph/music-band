// src/app/controllers/ContactController.js
import Contact from '../models/Contact.js';
export const index = async (req, res) => {
    try {
        const contacts = await Contact.find({})
        res.render('contact', { title: 'Liên hệ', contacts });
    } catch (error) {
        console.log(error);
        res.render('error', { message: "Lỗi Server" })
    }
}