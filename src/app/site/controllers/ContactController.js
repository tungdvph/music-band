// src/app/site/controllers/ContactController.js
import ContactService from '../services/ContactService.js'; // Đã sửa đường dẫn
import { validationResult } from 'express-validator';

export const index = async (req, res) => {
    // Chỉ render form liên hệ.  Không cần lấy danh sách liên hệ.
    res.render('site/contact', { title: 'Liên hệ', layout: false }); // Sửa đường dẫn view và layout
};

export const create = async (req, res, next) => { // Thêm 'next'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Nếu có lỗi validation, render lại form với thông báo lỗi
        return res.render('site/contact', {  // Sửa đường dẫn view và layout
            title: 'Liên hệ',
            errors: errors.array(),
            formData: req.body, // Giữ lại dữ liệu người dùng đã nhập
            layout: false
        });
    }

    try {
        const newContact = await ContactService.createContact(req.body);
        // Chuyển hướng đến trang cảm ơn, hoặc hiển thị thông báo thành công
        res.render('site/contact', { // Sửa đường dẫn view và layout
            title: "Liên Hệ",
            success: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.",
            layout: false
        });

    } catch (error) {
        next(error); // Chuyển lỗi cho middleware
    }
};