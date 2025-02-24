// src/app/controllers/AuthController.js
// TẠM THỜI để trống phần xử lý logic, vì phần này phức tạp,
// liên quan đến bảo mật (hash mật khẩu, xác thực token, ...).
// Chúng ta sẽ làm phần này SAU KHI hoàn thành các chức năng cơ bản khác.

export const login = (req, res) => {
    res.render('auth/login', { title: "Đăng nhập" });
};

export const register = (req, res) => {
    res.render('auth/register', { title: "Đăng ký" });
};


// export const postLogin = async (req, res) => { ... }; // Xử lý khi user submit form login
// export const postRegister = async (req, res) => { ... }; // Xử lý khi user submit form register