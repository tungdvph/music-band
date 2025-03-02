// src/app/admin/controllers/ContactController.js
import ContactService from '../services/ContactService.js';
import { validationResult } from 'express-validator';

export const index = async (req, res, next) => {
    try {
        const contacts = await ContactService.getAllContacts();
        // SỬA ĐƯỜNG DẪN VIEW Ở ĐÂY:
        res.render('contacts/index', { title: "Quản lý liên hệ", contacts: contacts, layout: 'admin' })
    }
    catch (error) {
        next(error)
    }
}

export const show = async (req, res, next) => {
    try {
        const contact = await ContactService.getContactById(req.params.id);
        if (!contact) {
            return res.status(404).render('error', { message: "Không tìm thấy liên hệ" })
        }
        // SỬA ĐƯỜNG DẪN VIEW Ở ĐÂY:
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
        const { newStatus } = req.body; // Lấy trạng thái mới từ body (ví dụ: từ một form)

        const updatedContact = await ContactService.updateContactStatus(id, newStatus);

        if (!updatedContact) {
            return res.status(404).render('error', { message: 'Không tìm thấy liên hệ' });
        }

        // Trả về JSON hoặc chuyển hướng (tùy bạn)
        res.redirect(`/admin/contacts/${id}`)
    } catch (error) {
        next(error);
    }
};
export const markAsRead = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedContact = await ContactService.markAsRead(id);

        if (!updatedContact) {
            return res.status(404).render('error', { message: 'Không tìm thấy liên hệ' });
        }
        res.redirect(`/admin/contacts/${id}`)
    } catch (error) {
        next(error)
    }
};
export const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await ContactService.deleteContact(id);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy liên hệ' });
        }
        res.redirect(`/admin/contacts`)
    }
    catch (error) {
        next(error)
    }
}