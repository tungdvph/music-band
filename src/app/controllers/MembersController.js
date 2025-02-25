// src/app/controllers/MembersController.js
import * as MemberService from '../services/MemberService.js';
import { validationResult } from 'express-validator';

export const index = async (req, res) => {
    try {
        const members = await MemberService.getAllMembers();
        res.render('members/index', { title: 'Thành viên', members });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || 'Lỗi khi tải trang thành viên.' });
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
        res.status(500).render('error', { message: error.message || 'Lỗi server.' });
    }
};

// CREATE
export const create = async (req, res) => {
    const bands = await MemberService.getAllBands();
    res.render('members/create', { title: 'Thêm thành viên', bands: bands });
};

export const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const bands = await MemberService.getAllBands(); // Lấy danh sách band
        // Có lỗi validation
        return res.status(400).render('members/create', {
            title: 'Thêm thành viên',
            errors: errors.array(),
            member: req.body, // Gửi lại dữ liệu đã nhập, bao gồm cả band
            bands: bands // Thêm danh sách band
        });
    }

    try {
        const newMember = await MemberService.createMember(req.body);
        res.redirect('/members'); // Chuyển hướng về trang danh sách (hoặc trang chi tiết)
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || "Có lỗi xảy ra" })
    }
};

// UPDATE
export const edit = async (req, res) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        const bands = await MemberService.getAllBands(); // Lấy thông tin band

        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên' });
        }
        res.render('members/edit', { title: 'Chỉnh sửa thành viên', member: member, bands: bands });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server' });
    }
};

export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const member = await MemberService.getMemberBySlug(req.params.slug); // Phải lấy lại member
        const bands = await MemberService.getAllBands();
        // Có lỗi, render lại form edit
        return res.status(400).render('members/edit', {
            title: 'Chỉnh sửa thành viên',
            errors: errors.array(),
            member: member,
            bands: bands
        });
    }
    try {
        const updatedMember = await MemberService.updateMember(req.params.slug, req.body);

        if (!updatedMember) {
            return res.status(404).render('error', { message: "Không tìm thấy thành viên" })
        }
        res.redirect(`/members/${req.params.slug}`); // Chuyển hướng về trang chi tiết
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || "Có lỗi xảy ra" })
    }
};

// DELETE
export const confirmDelete = async (req, res) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);

        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên' });
        }

        res.render('members/confirm-delete', { title: 'Xác nhận xóa', member }); // Render view xác nhận
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server' });
    }
};
export const destroy = async (req, res) => {
    try {
        const result = await MemberService.deleteMember(req.params.slug);
        if (!result) {
            return res.status(404).render('error', { message: "Không tìm thấy thành viên để xóa" })
        }
        res.redirect('/members'); // Chuyển hướng về trang danh sách
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: error.message || "Có lỗi xảy ra" })
    }
};