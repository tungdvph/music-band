// src/app/admin/services/MemberService.js
import Member from '../../models/Member.js';
import Band from '../../models/Band.js'; // Import nếu bạn cần dùng Band trong service này

class MemberService { // Tạo class
    async getAllMembers() {
        try {
            const members = await Member.find({}).lean();
            // console.log("Members in service:", members); // Bỏ dòng này khi không cần debug nữa
            return members;
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách thành viên: ' + error.message);
        }
    }

    async getMemberBySlug(slug) {
        try {
            const member = await Member.findOne({ slug }).populate('band').lean();
            return member;
        } catch (error) {
            throw new Error('Lỗi khi lấy thông tin thành viên: ' + error.message);
        }
    }

    // Phương thức này nên chuyển sang BandService
    // async getAllBands() {
    //     try {
    //         const bands = await Band.find({}).lean();
    //         return bands;
    //     } catch (error) {
    //         throw new Error('Lỗi khi lấy danh sách ban nhạc: ' + error.message);
    //     }
    // }

    async createMember(memberData) {
        try {
            const newMember = await Member.create(memberData);
            return newMember;
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("Tên thành viên đã tồn tại")
            }
            throw new Error('Lỗi khi tạo thành viên: ' + error.message);
        }
    }

    async updateMember(slug, updatedData) {
        try {
            const updatedMember = await Member.findOneAndUpdate({ slug: slug }, updatedData, { new: true, runValidators: true }).lean();
            return updatedMember;
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("Tên thành viên đã tồn tại")
            }
            throw new Error('Lỗi khi cập nhật thành viên: ' + error.message);
        }
    }

    async deleteMember(slug) {
        try {
            const result = await Member.findOneAndDelete({ slug: slug }).lean();
            return result
        } catch (error) {
            throw new Error('Lỗi khi xóa thành viên: ' + error.message);
        }
    }
}
export default new MemberService(); // Export một instance