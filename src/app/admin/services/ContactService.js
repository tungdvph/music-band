// src/app/admin/services/ContactService.js
import Contact from '../../models/Contact.js';

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
    async createContact(data) {
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

    async getContactStatusCounts() {
        try {
            const result = await Contact.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]);

            const statusCounts = {};
            result.forEach(item => {
                statusCounts[item._id] = item.count;
            });

            const allStatusCounts = {
                'read': 0,
                'unread': 0,
            };

            for (const status in statusCounts) {
                if (allStatusCounts.hasOwnProperty(status)) {
                    allStatusCounts[status] = statusCounts[status];
                }
            }
            return allStatusCounts;

        } catch (error) {
            throw new Error('Lỗi khi lấy số lượng liên hệ theo trạng thái: ' + error.message);
        }
    }
}

export default ContactService; // Sửa: Export class