// src/app/controllers/MembersController.js
import Member from '../models/Member.js';

export const index = async (req, res) => {
    try {
        const members = await Member.find({}).lean();
        console.log('Members from database:', members); // Thêm log này
        res.render('members/index', { title: 'Thành viên', members: members });
    } catch (error) {
        console.error(error);
        res.render('error', { message: 'Lỗi khi tải trang thành viên.' });
    }
};

export const show = async (req, res) => {
    try {
        const member = await Member.findOne({ slug: req.params.slug }).populate('band'); // Tìm thành viên theo slug, populate để lấy thông tin band
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên.' });
        }
        res.render('members/show', { title: member.name, member });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server.' }); // HTTP status code 500 cho lỗi server
    }
};