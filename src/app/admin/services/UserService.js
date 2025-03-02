// src/app/admin/services/UserService.js
import User from '../../models/User.js'; // Đường dẫn tương đối đến User model

class UserService {
    async getTotalUsers() {
        try {
            const count = await User.countDocuments(); // Đếm số lượng user
            return count;
        } catch (error) {
            throw new Error('Lỗi thống kê user: ' + error.message);
        }
    }

    // Thêm các phương thức khác nếu cần (createUser, getUserById, updateUser, deleteUser, ...)
}

export default new UserService();