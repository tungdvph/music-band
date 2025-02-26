// src/app/adminControllers/DashboardController.js

export async function index(req, res) {
    try {
        // Dữ liệu mẫu cho dashboard (sau này bạn sẽ lấy từ database)
        const data = {
            totalUsers: 123, // Tổng số người dùng
            totalBookings: 45,  // Tổng số booking
            totalSongs: 678,   // Tổng số bài hát
            recentBookings: [ // Một số booking gần đây (mẫu)
                { name: 'Nguyễn Văn A', date: '2024-03-15', time: '19:00', venue: 'Hanoi' },
                { name: 'Trần Thị B', date: '2024-03-10', time: '20:00', venue: 'HCM' },
            ],
        };

        // Render view 'admin/dashboard' và truyền dữ liệu vào
        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            layout: 'admin', // Sử dụng layout admin (nếu bạn có)
            ...data, // Spread operator để truyền các thuộc tính của data vào view
        });

    } catch (error) {
        console.error('Error in DashboardController:', error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
}