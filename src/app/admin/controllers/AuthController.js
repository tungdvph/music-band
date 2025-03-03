// src/app/admin/controllers/AuthController.js
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

export const login = (req, res) => {
    res.render('auth/login', { layout: false }); // Không sử dụng layout
};

export const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Tìm user theo username
        const user = await User.findOne({ username });
        if (!user) {
            req.flash('error_msg', 'Tên đăng nhập hoặc mật khẩu không đúng.');
            return res.redirect('/admin/auth/login'); // Chuyển hướng về trang login, KHÔNG render lại
        }

        // 2. Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error_msg', 'Tên đăng nhập hoặc mật khẩu không đúng.');
            return res.redirect('/admin/auth/login');
        }

        // 3. Lưu thông tin user vào session
        req.session.user = {
            _id: user._id,
            username: user.username,
            role: user.role, // Lưu cả role
        };

        // 4. Kiểm tra role và chuyển hướng
        if (user.role === 'admin') {
            res.redirect('/admin'); // Chuyển hướng đến dashboard (hoặc trang admin chính)
        } else {
            req.flash('error_msg', 'Bạn không có quyền truy cập vào trang quản trị.');
            return res.redirect('/admin/auth/login');
        }

    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Đã xảy ra lỗi. Vui lòng thử lại.');
        res.redirect('/admin/auth/login');
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) => { // Xóa session
        if (err) {
            console.error("Lỗi khi đăng xuất:", err);
            return res.status(500).send("Lỗi server");
        }
        res.redirect('/admin/auth/login'); // Chuyển hướng về trang login
    });
};