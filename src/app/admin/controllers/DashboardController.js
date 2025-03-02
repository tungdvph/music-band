// src/app/admin/controllers/DashboardController.js

export const index = (req, res) => {
    // Bạn có thể thêm logic để lấy dữ liệu thống kê (số lượng users, bookings, ...)
    // và truyền vào view.  Hiện tại, chỉ render view đơn giản.
    res.render('admin/dashboard/index', { title: 'Dashboard', layout: 'admin' });
};