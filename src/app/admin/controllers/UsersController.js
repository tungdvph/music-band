// src/app/admin/controllers/UsersController.js
import UserService from '../services/UserService.js';
import { body, validationResult } from 'express-validator';

export const index = async (req, res, next) => {
    try {
        const userService = new UserService(); // Tạo instance
        const users = await userService.getAllUsers();
        res.render('users/index', { title: 'Quản lý người dùng', users, layout: 'admin' }); // Sửa đường dẫn
    } catch (error) {
        next(error);
    }
};

export const create = (req, res) => {
    res.render('users/create', { title: 'Thêm người dùng', layout: 'admin' }); // Sửa đường dẫn
};

export const store = [
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
    body('role')
        .isIn(['admin', 'user', 'member']).withMessage('Vai trò không hợp lệ.'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('users/create', { // Sửa đường dẫn
                title: 'Thêm người dùng',
                layout: 'admin',
                errors: errors.array(),
                user: req.body,
            });
        }

        try {
            const userService = new UserService(); // Tạo instance
            const newUser = await userService.createUser(req.body);
            res.redirect('/admin/users');
        } catch (error) {
            if (error.message.startsWith('Tên đăng nhập đã tồn tại') || error.message.startsWith('Email đã tồn tại')) {
                return res.render("users/create", { // Sửa đường dẫn
                    title: 'Thêm người dùng',
                    layout: 'admin',
                    errors: [{ msg: error.message }],
                    user: req.body,
                });
            }
            next(error);
        }
    }
];

export const show = async (req, res, next) => {
    try {
        const userService = new UserService(); // Tạo instance
        const user = await userService.getUserById(req.params.id);
        res.render('users/show', { title: 'Chi tiết người dùng', user, layout: 'admin' }); // Sửa đường dẫn
    } catch (error) {
        if (error.message === 'Không tìm thấy người dùng.') {
            return res.status(404).render('error', { message: 'Không tìm thấy người dùng', layout: 'admin' });
        }
        next(error);
    }
};

export const edit = async (req, res, next) => {
    try {
        const userService = new UserService(); // Tạo instance
        const user = await userService.getUserById(req.params.id);
        res.render('users/edit', { title: 'Sửa người dùng', user, layout: 'admin' }); // Sửa đường dẫn
    } catch (error) {
        if (error.message === 'Không tìm thấy người dùng.') {
            return res.status(404).render('error', { message: 'Không tìm thấy người dùng', layout: 'admin' });
        }
        next(error);
    }
};

export const update = [
    // Validation rules
    body('email')
        .isEmail().withMessage('Email không hợp lệ.')
        .normalizeEmail(),
    body('fullName')
        .trim()
        .isLength({ min: 1 }).withMessage('Họ và tên không được để trống')
        .escape(),
    body('role')
        .isIn(['admin', 'user', 'member']).withMessage('Vai trò không hợp lệ.'),
    body('password')
        .optional({ checkFalsy: true })
        .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự.'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const userService = new UserService(); // Tạo instance
            const user = await userService.getUserById(req.params.id);
            return res.render('users/edit', { // Sửa đường dẫn
                title: 'Sửa người dùng',
                layout: 'admin',
                errors: errors.array(),
                user: user,
            });
        }

        try {
            const userService = new UserService(); // Tạo instance
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            res.redirect('/admin/users');
        } catch (error) {
            if (error.message.startsWith('Email đã tồn tại') || error.message === 'Không tìm thấy người dùng.') {
                const userService = new UserService(); // Tạo instance
                const user = await userService.getUserById(req.params.id);
                return res.render('users/edit', { // Sửa đường dẫn
                    title: 'Sửa người dùng',
                    layout: 'admin',
                    errors: [{ msg: error.message }],
                    user: user,
                });
            }
            next(error);
        }
    }
];

export const confirmDelete = async (req, res, next) => {
    try {
        const userService = new UserService(); // Tạo instance
        const user = await userService.getUserById(req.params.id);
        res.render('users/confirm-delete', { title: 'Xác nhận xóa', user, layout: 'admin' }); // Sửa đường dẫn
    } catch (error) {
        if (error.message === 'Không tìm thấy người dùng.') {
            return res.status(404).render('error', { message: 'Không tìm thấy người dùng', layout: 'admin' });
        }
        next(error);
    }
};

export const destroy = async (req, res, next) => {
    try {
        const userService = new UserService(); // Tạo instance
        await userService.deleteUser(req.params.id);
        res.redirect('/admin/users');
    } catch (error) {
        if (error.message === 'Không thể xóa người dùng này vì có dữ liệu liên quan.' || error.message.startsWith('Lỗi khi xóa người dùng')) {
            return res.redirect('/admin/users?error=' + encodeURIComponent(error.message));
        }
        next(error);
    }
};