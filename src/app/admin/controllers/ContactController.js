// src/app/admin/controllers/ContactController.js
import ContactService from '../services/ContactService.js';
import { validationResult } from 'express-validator';

export const index = async (req, res, next) => {
    try {
        const contactService = new ContactService(); // Tạo instance
        const contacts = await contactService.getAllContacts();
        res.render('contacts/index', { title: "Quản lý liên hệ", contacts: contacts, layout: 'admin' })
    }
    catch (error) {
        next(error)
    }
}

export const show = async (req, res, next) => {
    try {
        const contactService = new ContactService(); // Tạo instance
        const contact = await contactService.getContactById(req.params.id);
        if (!contact) {
            return res.status(404).render('error', { message: "Không tìm thấy liên hệ" })
        }
        res.render('contacts/show', { title: "Chi tiết liên hệ", contact: contact, layout: 'admin' })
    }
    catch (error) {
        next(error)
    }
}
// Các hàm khác giữ nguyên, chỉ sửa lại redirect và render cho đúng với admin
export const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { newStatus } = req.body; // Lấy trạng thái mới từ body

        const contactService = new ContactService(); // Tạo instance
        const updatedContact = await contactService.updateContactStatus(id, newStatus);

        if (!updatedContact) {
            return res.status(404).render('error', { message: 'Không tìm thấy liên hệ' });
        }

        // Trả về JSON hoặc chuyển hướng (tùy bạn)
        res.redirect(`/admin/contacts`)
    } catch (error) {
        next(error);
    }
};
export const markAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;

        const contactService = new ContactService(); // Tạo instance
        const updatedContact = await contactService.markAsRead(id);

        if (!updatedContact) {
            return res.status(404).render('error', { message: 'Không tìm thấy liên hệ' });
        }
        res.redirect(`/admin/contacts`)
    } catch (error) {
        next(error)
    }
};
export const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const contactService = new ContactService(); // Tạo instance
        const result = await contactService.deleteContact(id);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy liên hệ' });
        }
        res.redirect(`/admin/contacts`)
    }
    catch (error) {
        next(error)
    }
}
//createContact
export const createContact = async (req, res, next) => {
    try {
        const contactService = new ContactService(); // Tạo instance
        const newContact = await contactService.createContact(req.body);
        res.status(201).json(newContact); // Trả về 201 Created và dữ liệu liên hệ mới
    } catch (error) {
        next(error); // Chuyển lỗi cho middleware xử lý lỗi
    }
};