// src/app/site/controllers/AuthController.js
// TẠM THỜI để trống phần xử lý logic, vì phần này phức tạp,
// liên quan đến bảo mật (hash mật khẩu, xác thực token, ...).
// Chúng ta sẽ làm phần này SAU KHI hoàn thành các chức năng cơ bản khác.

export const login = (req, res) => {
    res.render('site/auth/login', { title: "Đăng nhập" }); // Sửa đường dẫn view
};

export const register = (req, res) => {
    res.render('site/auth/register', { title: "Đăng ký" }); // Sửa đường dẫn view
};

// export const postLogin = async (req, res) => { ... }; // Xử lý khi user submit form login
// export const postRegister = async (req, res) => { ... }; // Xử lý khi user submit form register