// src/app/admin/services/MemberService.js
import Member from '../../models/Member.js';
import Band from '../../models/Band.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // Import module fs để xóa file

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    async createMember(memberData, req) {
        try {
            // Xử lý upload ảnh
            let imagePath = null;
            if (req.file) {
                // Tạo đường dẫn tương đối, an toàn và tương thích đa nền tảng
                imagePath = path.join('uploads', req.file.filename).replace(/\\/g, "/");
            }

            // Handle empty string for band (convert to null)
            if (memberData.band === "") {
                memberData.band = null;
            }

            const newData = {
                ...memberData,
                image: imagePath, // Thêm đường dẫn ảnh
            }

            const newMember = await Member.create(newData);
            return newMember.toObject();
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("Tên thành viên đã tồn tại");
            }
            throw new Error('Lỗi khi tạo thành viên: ' + error.message);
        }
    }

    async updateMember(slug, updatedData, req) {
        try {
            // Xử lý upload ảnh
            let imagePath = null;
            if (req.file) {
                // Tạo đường dẫn tương đối, an toàn và tương thích đa nền tảng
                imagePath = path.join('uploads', req.file.filename).replace(/\\/g, "/");
            }

            // Handle empty string for band (convert to null)
            if (updatedData.band === "") {
                updatedData.band = null;
            }
            const newData = {
                ...updatedData,
                image: imagePath || updatedData.image, // Cập nhật đường dẫn ảnh mới, hoặc giữ nguyên cũ
            }

            const updatedMember = await Member.findOneAndUpdate(
                { slug: slug },
                newData,
                { new: true, runValidators: true }
            ).populate('band').lean();
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
            const member = await Member.findOneAndDelete({ slug: slug }).lean();
            if (member && member.image) {
                const imagePath = path.join(__dirname, '..', '..', 'public', member.image); // Đường dẫn tuyệt đối
                try {
                    fs.unlinkSync(imagePath); // Xóa file đồng bộ
                } catch (err) {
                    console.error("Lỗi khi xóa file ảnh:", err); // Log lỗi, không throw lại
                }
            }
            return member; // Trả về document đã xóa (hoặc null)
        } catch (error) {
            throw new Error('Lỗi khi xóa thành viên: ' + error.message);
        }
    }
}

export default new MemberService();