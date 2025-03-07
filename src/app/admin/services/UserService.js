import User from '../../models/User.js';
import bcrypt from 'bcryptjs'; // Import bcrypt

class UserService {
    async getAllUsers() {
        try {
            return await User.find({}).lean();
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách người dùng: ' + error.message);
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id).lean();
            if (!user) {
                throw new Error('Không tìm thấy người dùng.'); // Throw error để Controller xử lý
            }
            return user;
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin người dùng: ' + error.message);
        }
    }
    async createUser(userData) {
        try {
            // 1. Validation (có thể chuyển phần validation này sang một helper riêng)
            const { username, password, email, fullName, role } = userData;

            // Kiểm tra username và email đã tồn tại chưa
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                throw new Error('Tên đăng nhập đã tồn tại.');
            }

            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                throw new Error('Email đã tồn tại.');
            }

            // 2. Mã hóa mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 3. Tạo user mới
            const newUser = new User({
                username,
                password: hashedPassword,
                email,
                fullName,
                role
            });

            // 4. Lưu vào database
            await newUser.save();
            return newUser.toObject(); // Trả về user object (đã loại bỏ hàm toJSON)

        } catch (error) {
            throw new Error('Lỗi khi tạo người dùng: ' + error.message);

        }
    }


    async updateUser(id, updateData) {
        try {
            // 1. Kiểm tra sự tồn tại
            const user = await User.findById(id);
            if (!user) {
                throw new Error('Không tìm thấy người dùng.');
            }

            const { email, fullName, role, password } = updateData;

            const updateFields = {
                email,
                fullName,
                role,
            };
            // 2. Kiểm tra email (nếu thay đổi)
            if (email && email !== user.email) {
                const existingEmail = await User.findOne({ email });
                if (existingEmail) {
                    throw new Error('Email đã tồn tại.');
                }
            }

            // 3. Mã hóa password (nếu có)
            if (password) {
                const salt = await bcrypt.genSalt(10);
                updateFields.password = await bcrypt.hash(password, salt);
            }
            // 4. Cập nhật.
            // Dùng findByIdAndUpdate và { new: true } để trả về bản ghi sau khi update
            const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true }).lean();
            return updatedUser;

        } catch (error) {
            throw new Error('Lỗi khi cập nhật người dùng: ' + error.message);
        }
    }

    async deleteUser(id) {
        try {
            // 1. Kiểm tra sự tồn tại (Optional, findByIdAndDelete sẽ trả về null nếu không tìm thấy)
            const user = await User.findById(id);

            // 2. Xóa (nếu tìm thấy)
            if (user) {
                const result = await User.findByIdAndDelete(id);
                return result;
            }
        } catch (error) {
            // Kiểm tra xem có phải lỗi do ràng buộc khóa ngoại không
            if (error.name === 'MongoServerError' && error.code === 1451) {
                throw new Error('Không thể xóa người dùng này vì có dữ liệu liên quan.');
            }
            throw new Error('Lỗi khi xóa người dùng: ' + error.message);
        }
    }

    async getTotalUsers() { //Hàm bạn đã có
        try {
            const count = await User.countDocuments();
            return count;
        } catch (error) {
            throw new Error('Lỗi thống kê user: ' + error.message);
        }
    }
}

export default UserService; 