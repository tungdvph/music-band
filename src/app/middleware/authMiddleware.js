// src/app/middleware/authMiddleware.js

export function requireAdmin(req, res, next) {
    // Bỏ qua mọi kiểm tra, luôn cho phép truy cập
    next(); // Chuyển sang middleware/route handler tiếp theo
}