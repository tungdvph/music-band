// src/app/admin/controllers/MembersController.js
import MemberService from '../services/MemberService.js';
import { validationResult } from 'express-validator';
import BandService from '../services/BandService.js'; // Import BandService

// Lấy danh sách tất cả thành viên (cho trang index)
export const index = async (req, res, next) => {
    try {
        const members = await MemberService.getAllMembers();
        res.render('members/index', { title: 'Quản lý thành viên', members, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

// Hiển thị form tạo thành viên
export const create = async (req, res, next) => {
    try {
        const bands = await BandService.getAllBands();
        res.render('members/create', { title: 'Thêm thành viên', bands, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

// Xử lý dữ liệu tạo thành viên (store)
export const store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        try {
            const bands = await BandService.getAllBands();
            return res.status(400).render('members/create', {
                title: 'Thêm thành viên',
                errors: errors.array(),
                member: req.body, // Truyền lại dữ liệu đã nhập để hiển thị lại trong form
                bands,
                layout: 'admin'
            });
        } catch (error) {
            next(error);
        }
    }

    try {
        const newMember = await MemberService.createMember(req.body, req); // Truyền req vào để xử lý file upload
        res.redirect('/admin/members');
    } catch (error) {
        next(error);
    }
};

// Hiển thị thông tin chi tiết (show)
export const show = async (req, res, next) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên', layout: 'admin' });
        }
        res.render('members/show', { title: member.name, member, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

// Hiển thị form chỉnh sửa (edit)
export const edit = async (req, res, next) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        const bands = await BandService.getAllBands();
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên', layout: 'admin' });
        }
        res.render('members/edit', { title: 'Chỉnh sửa thành viên', member, bands, layout: 'admin' });

    } catch (error) {
        next(error);
    }
};

// Xử lý cập nhật (update)
export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        try {
            const member = await MemberService.getMemberBySlug(req.params.slug); // Lấy thông tin member *trước* khi cập nhật
            const bands = await BandService.getAllBands();
            //Sử dụng spread operator để cập nhật thông tin từ req.body, *ghi đè* lên thông tin cũ.
            return res.status(400).render('members/edit', {
                title: 'Chỉnh sửa thành viên',
                errors: errors.array(),
                member: { ...member, ...req.body },  // Quan trọng: merge data
                bands,
                layout: 'admin'
            });
        } catch (error) {
            next(error);
        }
    }

    try {
        const updatedMember = await MemberService.updateMember(req.params.slug, req.body, req); // Truyền req
        if (!updatedMember) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên', layout: 'admin' });
        }
        res.redirect(`/admin/members/${updatedMember.slug}`);
    } catch (error) {
        next(error);
    }
};

// Hiển thị trang xác nhận xóa (confirmDelete)
export const confirmDelete = async (req, res, next) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên', layout: 'admin' });
        }
        res.render('members/confirm-delete', { title: 'Xác nhận xóa', member, layout: 'admin' });
    } catch (error) {
        next(error);
    }
};

// Xử lý xóa (destroy)
export const destroy = async (req, res, next) => {
    try {
        const result = await MemberService.deleteMember(req.params.slug);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên', layout: 'admin' });
        }
        res.redirect('/admin/members');
    } catch (error) {
        next(error);
    }
};
// API Routes (dành cho client-side rendering, ví dụ React)
export const getMembersForClient = async (req, res) => {
    try {
        const members = await MemberService.getAllMembers();
        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách thành viên.' });
    }
};

export const getMemberDetail = async (req, res) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        if (!member) {
            return res.status(404).json({ message: "Không tìm thấy thành viên" });
        }
        res.json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi Server" });
    }
};