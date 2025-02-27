// src/app/adminControllers/ContactController.js 
import ContactService from '../services/ContactService.js';

class ContactController {
    async index(req, res) {
        try {
            const contacts = await ContactService.getAllContacts();
            res.render('admin/contacts/index', { title: 'Quản lý Liên Hệ', contacts, layout: 'admin' });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Error loading contacts', layout: 'admin' });
        }
    }

    async show(req, res) {
        try {
            const contact = await ContactService.getContactById(req.params.id);
            if (!contact) {
                return res.status(404).render('error', { message: 'Contact not found', layout: 'admin' });
            }
            res.render('admin/contacts/show', { title: 'Chi tiết Liên Hệ', contact, layout: 'admin' });
        } catch (error) {
            console.error(error);
             res.status(500).render('error', { message: 'Error show contacts', layout: 'admin' });
        }
    }

    async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedContact = await ContactService.updateContactStatus(id, status);
            if (!updatedContact) {
                return res.status(404).render('error', { message: 'Contact not found', layout: 'admin' });
            }
            res.redirect('/admin/contacts'); // Hoặc trả về JSON response nếu bạn dùng AJAX
        } catch (error) {
             console.error(error);
            res.status(500).render('error', { message: 'Error update status contacts', layout: 'admin' });
        }
    }
     async markAsRead(req, res) {
        try {
            const { id } = req.params; // Lấy ID từ URL parameter
            const updatedContact = await ContactService.markAsRead(id);

            // Kiểm tra xem có contact nào được update không (ID có hợp lệ không)
            if (!updatedContact) {
                return res.status(404).json({ message: 'Contact not found' }); // Hoặc chuyển hướng, tùy bạn
            }

            // Trả về JSON response cho biết đã update thành công
            res.status(200).json({ message: 'Contact marked as read', contact: updatedContact });
        } catch (error) {
            console.error('Error marking contact as read:', error);
            res.status(500).json({ message: 'Error updating contact' });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await ContactService.deleteContact(id);
            res.redirect('/admin/contacts');
        } catch (error) {
            console.error(error);
             res.status(500).render('error', { message: 'Error delete contacts', layout: 'admin' });

        }
    }

    // Thêm các action khác (edit, update, ...) nếu cần
}

export default new ContactController();