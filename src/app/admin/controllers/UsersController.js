// src/app/admin/controllers/UsersController.js
// TẠM THỜI CHƯA CÓ LOGIC XỬ LÝ USER.  Phần này liên quan đến xác thực, phân quyền,
// và thường phức tạp hơn.  Bạn nên làm phần này SAU KHI đã hoàn thành các chức năng cơ bản khác.
// Để đơn giản, bạn có thể tạo một vài user MẪU trong database, và chỉ hiển thị danh sách user đó.

import User from '../../models/User.js'; // Import model User

export const index = async (req, res) => {
    try {
        const users = await User.find({}).lean(); // Lấy tất cả users (TẠM THỜI)
        res.render('admin/users/index', { title: 'Quản lý người dùng', users: users, layout: 'admin' });
    }
    catch (error) {
        next(error)
    }
};

// Các hàm khác (create, store, show, edit, update, confirmDelete, destroy)
// Sẽ cần được triển khai SAU KHI bạn làm xong phần xác thực và phân quyền.
// ...
//
//
//
//
//
//