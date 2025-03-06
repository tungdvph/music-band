// src/app/admin/controllers/AuthClientController.js

import AuthService from '../services/AuthService.js'; // Import AuthService (dùng chung)
import { body, validationResult } from 'express-validator';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

export const register = [
    // Validation rules
    body('username')
        .trim()
        .isLength({ min: 3 }).withMessage('Tên đăng nhập phải có ít nhất 3 ký tự.')
        .isAlphanumeric().withMessage('Tên đăng nhập chỉ được chứa chữ và số.')
        .escape(),
    body('password')
        .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự.'),
    body('email')
        .isEmail().withMessage('Email không hợp lệ.')
        .normalizeEmail(),
    body('fullName')
        .trim()
        .isLength({ min: 1 }).withMessage('Họ và tên không được để trống')
        .escape(),

    // Request handling (after validation)
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Trả về lỗi validation
        }

        try {
            const { username, password, email, fullName } = req.body;

            // Kiểm tra username và email đã tồn tại chưa (dùng lại logic từ UserService)
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại.' });
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: 'Email đã tồn tại.' });
            }

            // Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Tạo user mới với role mặc định là 'user'
            const newUser = new User({
                username,
                password: hashedPassword,
                email,
                fullName,
                role: 'user', // Mặc định là 'user'
            });

            await newUser.save();

            // Trả về thông báo thành công
            res.status(201).json({ message: 'Đăng ký thành công! Vui lòng đăng nhập.' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng ký.' });
        }
    }
];

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const authResult = await AuthService.authenticateUser(username, password);

        if (!authResult.success) {
            return res.status(401).json({ message: authResult.message });
        }

        // Lấy thông tin user từ authResult (đã loại bỏ password)
        const user = authResult.user;


        // Lưu thông tin user vào session *CHỈ* các thông tin cần thiết
        req.session.user = {
            _id: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
            fullName: user.fullName
        };


        res.json({ message: 'Đăng nhập thành công!', user: req.session.user }); // Trả về session.user

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng nhập.' });
    }
};


export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Lỗi khi đăng xuất:", err);
            return res.status(500).json({ message: 'Lỗi server' });
        }
        res.json({ message: 'Đăng xuất thành công!' }); // Trả về JSON
    });
};