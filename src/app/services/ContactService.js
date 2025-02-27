// src/app/services/ContactService.js 
import Contact from '../models/Contact.js';

class ContactService {
    async getAllContacts() {
        try {
            return await Contact.find({}).sort({ createdAt: -1 }).lean(); // Sắp xếp theo thời gian tạo mới nhất
        } catch (error) {
            throw new Error('Error getting contacts: ' + error.message);
        }
    }

    async getContactById(id) {
        try {
            return await Contact.findById(id).lean();
        } catch (error) {
            throw new Error('Error getting contact: ' + error.message);
        }
    }
    async createContact(data){
        try {
            const newContact = new Contact(data)
            return await newContact.save();
        } catch (error) {
            throw new Error('Error create contact: ' + error.message);
        }
    }

    async updateContactStatus(id, newStatus) {
        try {
            return await Contact.findByIdAndUpdate(id, { status: newStatus }, { new: true }).lean();
        } catch (error) {
            throw new Error('Error updating contact status: ' + error.message);
        }
    }
     async markAsRead(id) {
        try {
            const updatedContact = await Contact.findByIdAndUpdate(
                id,
                { isRead: true },
                { new: true } // Return the updated document
            );

            if (!updatedContact) {
                throw new Error('Contact not found'); // Or handle it as you prefer
            }

            return updatedContact;
        } catch (error) {
             throw new Error('Error mark as read contact: ' + error.message);
        }
    }
    async deleteContact(id) {
        try {
            return await Contact.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting contact: ' + error.message);
        }
    }
     // Thêm các phương thức khác nếu cần (ví dụ: searchContacts, filterContacts, ...)
}

export default new ContactService();