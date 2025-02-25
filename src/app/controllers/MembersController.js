// src/app/controllers/MembersController.js
import * as MemberService from '../services/MemberService.js'; // Import service

export const index = async (req, res) => {
    try {
        const members = await MemberService.getAllMembers();
        res.render('members/index', { title: 'Thành viên', members });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || 'Lỗi khi tải trang thành viên.' }); // Hiển thị message lỗi cụ thể từ service
    }
};

export const show = async (req, res) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên.' });
        }
        res.render('members/show', { title: member.name, member });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || 'Lỗi server.' }); // Hiển thị message lỗi
    }
};