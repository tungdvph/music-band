// src/app/middleware/authMiddleware.js
export const requireAdmin = (req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        // Tạo một user "fake" CHỈ TRONG MÔI TRƯỜNG DEVELOPMENT
        req.user = {
            _id: 'fakeUserId',
            username: 'testadmin',
            isAdmin: true,
        };
        return next();
    }

    // Phần code gốc (khi đã có hệ thống đăng nhập):
    if (req.session.user && req.session.user.isAdmin) {
        req.user = req.session.user;
        return next();
    } else {
        return res.status(403).redirect('/admin/auth/login?error=Bạn không có quyền truy cập. Vui lòng đăng nhập.');
    }
};