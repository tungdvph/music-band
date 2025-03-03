// src/app/admin/services/MemberService.js
import Member from '../../models/Member.js';
import Band from '../../models/Band.js'; // Import Band model (needed for populate)

class MemberService {
    async getAllMembers() {
        try {
            // Use .populate() to get band details, and .lean() for plain JS objects
            const members = await Member.find({}).populate('band').lean();
            return members;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách thành viên: ' + error.message);
        }
    }

    async getMemberBySlug(slug) {
        try {
            // Use .populate() to get band details, and .lean()
            const member = await Member.findOne({ slug }).populate('band').lean();
            return member;
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin thành viên: ' + error.message);
        }
    }

    async createMember(memberData) {
        try {
            // Handle empty string for band (convert to null)
            if (memberData.band === "") {
                memberData.band = null;
            }
            const newMember = await Member.create(memberData);
            return newMember.toObject(); // Convert to plain JS object after creation
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("Tên thành viên đã tồn tại");
            }
            throw new Error('Lỗi khi tạo thành viên: ' + error.message);
        }
    }

    async updateMember(slug, updatedData) {
        try {
            // Handle empty string for band (convert to null)
            if (updatedData.band === "") {
                updatedData.band = null;
            }
            const updatedMember = await Member.findOneAndUpdate(
                { slug: slug },
                updatedData,
                { new: true, runValidators: true }
            ).populate('band').lean(); // Populate and then convert to plain object
            return updatedMember;
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("Tên thành viên đã tồn tại");
            }
            throw new Error('Lỗi khi cập nhật thành viên: ' + error.message);
        }
    }

    async deleteMember(slug) {
        try {
            const result = await Member.findOneAndDelete({ slug: slug }).lean();
            return result; // Returns the deleted document (or null if not found)
        } catch (error) {
            throw new Error('Lỗi khi xóa thành viên: ' + error.message);
        }
    }
}

export default new MemberService();