// src/app/admin/controllers/MembersController.js
import MemberService from '../services/MemberService.js';
import { validationResult } from 'express-validator';
import Band from '../../models/Band.js';
import BandService from '../services/BandService.js'; // Import BandService

// Lấy danh sách tất cả thành viên (cho trang index)
export const index = async (req, res, next) => {
    try {
        const members = await MemberService.getAllMembers();
        res.render('members/index', { title: 'Quản lý thành viên', members, layout: 'admin' }); // Đúng
    } catch (error) {
        next(error);
    }
};

// Hiển thị form tạo thành viên
export const create = async (req, res, next) => {
    try {
        const bands = await BandService.getAllBands();
        res.render('members/create', { title: 'Thêm thành viên', bands, layout: 'admin' }); // ĐÚNG
    } catch (error) {
        next(error)
    }
};

// Xử lý dữ liệu tạo thành viên
export const store = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        try {
            const bands = await BandService.getAllBands();
            return res.status(400).render('members/create', { // SỬA Ở ĐÂY
                title: 'Thêm thành viên',
                errors: errors.array(),
                member: req.body,
                bands,
                layout: 'admin'
            });
        } catch (error) {
            next(error)
        }
    }

    try {
        const newMember = await MemberService.createMember(req.body);
        res.redirect('/admin/members');
    } catch (error) {
        next(error);
    }
};

// Hiển thị thông tin chi tiết
export const show = async (req, res, next) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên' });
        }
        res.render('members/show', { title: member.name, member, layout: 'admin' }); // SỬA Ở ĐÂY
    } catch (error) {
        next(error);
    }
};

// Hiển thị form chỉnh sửa
export const edit = async (req, res, next) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        const bands = await BandService.getAllBands();
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên' });
        }
        res.render('members/edit', { title: 'Chỉnh sửa thành viên', member, bands, layout: 'admin' }); // SỬA Ở ĐÂY
    } catch (error) {
        next(error);
    }
};

// Xử lý cập nhật
export const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        try {
            const member = await MemberService.getMemberBySlug(req.params.slug); // Lấy thông tin member
            const bands = await BandService.getAllBands();
            return res.status(400).render('members/edit', {  // SỬA Ở ĐÂY
                title: 'Chỉnh sửa thành viên',
                errors: errors.array(),
                member: { ...member, ...req.body }, // Gộp thông tin cũ và mới
                bands,
                layout: 'admin'
            });
        } catch (error) {
            next(error)
        }
    }

    try {
        const updatedMember = await MemberService.updateMember(req.params.slug, req.body);
        if (!updatedMember) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên' });
        }
        res.redirect(`/admin/members/${updatedMember.slug}`);
    } catch (error) {
        next(error);
    }
};

// Hiển thị trang xác nhận xóa
export const confirmDelete = async (req, res, next) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên' });
        }
        res.render('members/confirm-delete', { title: 'Xác nhận xóa', member, layout: 'admin' }); // SỬA Ở ĐÂY
    } catch (error) {
        next(error);
    }
};

// Xử lý xóa
export const destroy = async (req, res, next) => {
    try {
        const result = await MemberService.deleteMember(req.params.slug);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên' });
        }
        res.redirect('/admin/members');
    } catch (error) {
        next(error);
    }
};