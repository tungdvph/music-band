// src/app/adminControllers/UsersController.js

export async function index(req, res) {
    try {
        // TODO: Lấy danh sách users từ database
        const users = []; // Thay bằng dữ liệu thực tế

        res.render('admin/users/index', {
            title: 'Quản lý người dùng',
            layout: 'admin', // Nếu bạn có layout admin
            users: users,
        });

    } catch (error) {
        console.error('Error in UsersController:', error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
}

// Bạn có thể thêm các hàm khác (create, show, edit, update, destroy) sau