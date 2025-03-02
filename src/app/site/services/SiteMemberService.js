// src/app/site/services/SiteMemberService.js
import Member from '../../models/Member.js';

class SiteMemberService {
    async getAllMembers() {
        try {
            const members = await Member.find({}).lean(); // Hoặc có thể thêm các điều kiện (ví dụ: chỉ lấy thành viên đang hoạt động)
            return members;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách thành viên: ' + error.message);
        }
    }

    async getMemberBySlug(slug) {
        try {
            const member = await Member.findOne({ slug }).populate('band').lean(); // Có thể thêm điều kiện (ví dụ: chỉ lấy thành viên đang hoạt động)
            return member;
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin thành viên: ' + error.message);
        }
    }
    // ... các phương thức khác nếu cần cho phần site (nhưng KHÔNG có create, update, delete)
}

export default new SiteMemberService();