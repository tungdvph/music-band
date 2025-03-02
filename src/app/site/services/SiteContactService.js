// src/app/site/services/SiteContactService.js
import Contact from '../../models/Contact.js';

class SiteContactService {
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

export default new SiteContactService();