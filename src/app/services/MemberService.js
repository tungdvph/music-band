// src/app/services/MemberService.js
import Member from '../models/Member.js';
import Band from '../models/Band.js';

export const getAllMembers = async () => {
    try {
        const members = await Member.find({}).lean();
        console.log("Members in service:", members); // Thêm dòng này
        return members;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách thành viên: ' + error.message);
    }
};

export const getMemberBySlug = async (slug) => {
    try {
        const member = await Member.findOne({ slug }).populate('band').lean();
        return member;
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin thành viên: ' + error.message);
    }
};
export const getAllBands = async () => {
    try {
        const bands = await Band.find({}).lean(); // Giả sử bạn có model Band
        return bands;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách ban nhạc: ' + error.message);
    }
};
// CREATE
export const createMember = async (memberData) => {
    try {
        const newMember = await Member.create(memberData); // Đúng: Không dùng .lean()
        return newMember;
    } catch (error) {
        // Xử lý lỗi (ví dụ: trùng tên)
        if (error.code === 11000) {
            throw new Error("Tên thành viên đã tồn tại")
        }
        throw new Error('Lỗi khi tạo thành viên: ' + error.message);
    }
};

// UPDATE
export const updateMember = async (slug, updatedData) => {
    try {
        const updatedMember = await Member.findOneAndUpdate({ slug: slug }, updatedData, { new: true, runValidators: true }).lean();  //Đúng
        // { new: true } trả về bản ghi sau khi update
        //runValidators: true để chạy validate của mongoose
        return updatedMember;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Tên thành viên đã tồn tại")
        }
        throw new Error('Lỗi khi cập nhật thành viên: ' + error.message);
    }
};

// DELETE
export const deleteMember = async (slug) => {
    try {
        const result = await Member.findOneAndDelete({ slug: slug }).lean(); // Đúng
        return result
    } catch (error) {
        throw new Error('Lỗi khi xóa thành viên: ' + error.message);
    }
};