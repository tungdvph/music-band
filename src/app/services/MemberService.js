// src/app/services/MemberService.js
import Member from '../models/Member.js';

export const getAllMembers = async () => {
    try {
        const members = await Member.find({}).lean();
        return members;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách thành viên: ' + error.message); // Ném lỗi cụ thể hơn
        // Hoặc có thể xử lý lỗi ở đây, tùy theo yêu cầu
    }
};

export const getMemberBySlug = async (slug) => {
    try {
        const member = await Member.findOne({ slug }).populate('band').lean();
        return member; // Không cần kiểm tra null ở đây
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin thành viên: ' + error.message);
    }
};

// Thêm các hàm khác liên quan đến Member: createMember, updateMember, deleteMember, ...