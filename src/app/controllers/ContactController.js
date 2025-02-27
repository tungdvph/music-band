// src/app/controllers/ContactController.js
import ContactService from '../services/ContactService.js';
import { validationResult } from 'express-validator'; // Import express-validator

export const index = async (req, res) => {
    try {
        // Không cần lấy danh sách liên hệ ở đây.  Trang contact public chỉ hiển thị form.
        res.render('contact', { title: 'Liên hệ' }); // Bỏ 'contacts'
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: "Lỗi Server" })
    }
};

export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Nếu có lỗi validation, render lại form với thông báo lỗi
        return res.render('contact', {
            title: 'Liên hệ',
            errors: errors.array(),
            formData: req.body, // Giữ lại dữ liệu người dùng đã nhập
        });
    }

    try {
        const newContact = await ContactService.createContact(req.body);
        // Chuyển hướng đến trang cảm ơn, hoặc hiển thị thông báo thành công
        res.render('contact', {title: "Liên Hệ", success: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể."});

    } catch (error) {
        console.error(error);
         // Nếu có lỗi khi lưu, render lại form với thông báo lỗi chung
        res.render('contact', {
            title: 'Liên hệ',
            errors: [{ msg: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' }],
            formData: req.body,
        });
    }
};