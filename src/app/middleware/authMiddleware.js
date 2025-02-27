// src/app/middleware/authMiddleware.js

export const requireAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    } else {
        return res.status(403).render('error', { message: 'Bạn không có quyền truy cập trang này.', layout: 'admin' });
    }
};