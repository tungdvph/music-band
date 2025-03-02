// src/app/site/controllers/MembersController.js
import SiteMemberService from '../services/SiteMemberService.js'; // Sửa đường dẫn

export const index = async (req, res, next) => { // Thêm 'next'
    try {
        const members = await SiteMemberService.getAllMembers();
        res.render('site/members/index', { title: 'Thành viên', members, layout: false }); // Sửa đường dẫn view
    } catch (error) {
        next(error);
    }
};

export const show = async (req, res, next) => { // Thêm 'next'
    try {
        const member = await SiteMemberService.getMemberBySlug(req.params.slug);
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên.', layout: false });
        }
        res.render('site/members/show', { title: member.name, member, layout: false }); // Sửa đường dẫn view
    } catch (error) {
        next(error);
    }
};