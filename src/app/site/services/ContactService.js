// src/app/site/services/ContactService.js
import Contact from '../../models/Contact.js';

class ContactService {
    async createContact(contactData) {
        try {
            const newContact = new Contact(contactData);
            await newContact.save();
            return newContact.toObject();

        } catch (error) {
            throw new Error('Lỗi khi gửi liên hệ: ' + error.message);
        }
    }
}

export default new ContactService();