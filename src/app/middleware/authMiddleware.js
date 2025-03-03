// src/middleware/authMiddleware.js

// Kiểm tra xem user đã đăng nhập chưa
export const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next(); // Cho phép đi tiếp
    } else {
        req.flash('error_msg', 'Bạn cần đăng nhập để truy cập.');
        res.redirect('/admin/auth/login');
    }
};

// Kiểm tra xem user có phải là admin không
export const requireAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        req.flash('error_msg', 'Bạn không có quyền truy cập.');
        res.redirect('/admin/auth/login'); // Hoặc chuyển hướng đến trang nào đó phù hợp
    }
};