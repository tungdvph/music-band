// src/app/middleware/authMiddleware.js

// Kiểm tra xem user đã đăng nhập chưa (cho cả admin và public)
export const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        // Nếu không đăng nhập, có thể chuyển hướng về trang đăng nhập của public HOẶC admin
        // tùy theo route
        if (req.originalUrl.startsWith('/admin')) { // Kiểm tra xem có phải trang admin không
            req.flash('error_msg', 'Bạn cần đăng nhập để truy cập trang quản trị.');
            return res.redirect('/admin/auth/login'); // Chuyển hướng đến trang đăng nhập của admin
        } else {
            // Chuyển hướng đến trang đăng nhập của public (bạn cần tạo trang này)
            return res.status(401).json({ message: "You need login" }); // hoặc trả về JSON nếu là API
        }
    }
    next();
};

// Kiểm tra xem user có phải là admin không
export const requireAdmin = (req, res, next) => {
    requireLogin(req, res, () => { // Gọi requireLogin trước
        if (req.session.user && req.session.user.role !== 'admin') { // Thêm kiểm tra req.session.user tồn tại
            req.flash('error_msg', 'Bạn không có quyền truy cập.');
            return res.redirect('/admin/auth/login'); // Hoặc chuyển về trang chủ, tùy bạn
        } else if (!req.session.user) { // Thêm trường hợp user không tồn tại trong session (đề phòng lỗi)
            req.flash('error_msg', 'Bạn cần đăng nhập để truy cập trang quản trị.');
            return res.redirect('/admin/auth/login');
        }
        next();
    });
};
// Middleware kiểm tra nếu là user thông thường (public)
export const requireUser = (req, res, next) => {
    requireLogin(req, res, () => { // Gọi requireLogin
        if (req.session.user && req.session.user.role !== 'user') {  // Thêm kiểm tra req.session.user tồn tại
            return res.status(403).json({ message: 'Bạn không có quyền truy cập.' }); // Trả về JSON
        } else if (!req.session.user) {
            return res.status(401).json({ message: "You need login" });
        }
        next();
    });
};

// Thêm một tài khoản admin mặc định (CHỈ DÙNG CHO MỤC ĐÍCH PHÁT TRIỂN/TEST)
export const checkDefaultAdmin = (req, res, next) => {
    if (req.body.username === 'admin' && req.body.password === '123456') { // Thay 'password' bằng mật khẩu bạn muốn
        req.session.user = {
            username: 'admin',
            role: 'admin'
        };
        return res.redirect('/admin'); // Hoặc trả về JSON xác nhận đăng nhập thành công nếu là API
    }
    next();
}