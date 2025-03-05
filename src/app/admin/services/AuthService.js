//src/app/admin/services/AuthService.js
// src/app/admin/services/AuthService.js
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

class AuthService {
    async authenticateUser(username, password) {
        try {
            // 1. Tìm user theo username
            const user = await User.findOne({ username }).lean();
            if (!user) {
                return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng.' };
            }

            // 2. Kiểm tra mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng.' };
            }

            // 3. Trả về thông tin user (loại bỏ mật khẩu)
            // Bỏ phần kiểm tra role
            return {
                success: true,
                user: {
                    _id: user._id,
                    username: user.username,
                    role: user.role,
                    email: user.email, // Thêm các thông tin cần thiết khác
                    fullName: user.fullName
                }
            };

        } catch (error) {
            console.error("Lỗi trong AuthService.authenticateUser:", error);
            return { success: false, message: 'Đã xảy ra lỗi trong quá trình xác thực.' };
        }

    }
    async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return { success: false, message: 'User not found.' };
            }

            // Verify the current password
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return { success: false, message: 'Incorrect current password.' };
            }

            // Hash and update the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();

            return { success: true, message: 'Password changed successfully.' };
        } catch (error) {
            console.error('Error in changePassword:', error);
            return { success: false, message: 'An error occurred while changing the password.' };
        }
    }
}

export default new AuthService();