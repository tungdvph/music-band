// src/app/adminControllers/MembersController.js
import * as MemberService from '../services/MemberService.js';
import { validationResult } from 'express-validator';

export const index = async (req, res) => {
    try {
        const members = await MemberService.getAllMembers();
        console.log("Members in controller:", members); // Thêm dòng này
        res.render('admin/members/index', { title: 'Quản lý Thành viên', members, layout: 'admin' });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi khi tải trang thành viên.', layout: 'admin' });
    }
};

export const show = async (req, res) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên.', layout: 'admin' });
        }
        res.render('admin/members/show', { title: member.name, member, layout: 'admin' });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server.', layout: 'admin' });
    }
};

export const create = async (req, res) => {
    const bands = await MemberService.getAllBands();
    res.render('admin/members/create', { title: 'Thêm thành viên', bands, layout: 'admin' });
};

export const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const bands = await MemberService.getAllBands();
        return res.status(400).render('admin/members/create', {
            title: 'Thêm thành viên',
            errors: errors.array(),
            member: req.body,
            bands,
            layout: 'admin'
        });
    }

    try {
        const newMember = await MemberService.createMember(req.body);
        res.redirect('/admin/members');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Có lỗi xảy ra', layout: 'admin' });
    }
};

export const edit = async (req, res) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        const bands = await MemberService.getAllBands();
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên', layout: 'admin' });
        }
        res.render('admin/members/edit', { title: 'Chỉnh sửa thành viên', member, bands, layout: 'admin' });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
    }
};

export const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        const bands = await MemberService.getAllBands();
        return res.status(400).render('admin/members/edit', {
            title: 'Chỉnh sửa thành viên',
            errors: errors.array(),
            member,
            bands,
            layout: 'admin'
        });
    }

    try {
        const updatedMember = await MemberService.updateMember(req.params.slug, req.body);
        if (!updatedMember) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên', layout: 'admin' });
        }
        res.redirect(`/admin/members`);
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Có lỗi xảy ra', layout: 'admin' });
    }
};

export const confirmDelete = async (req, res) => {
    try {
        const member = await MemberService.getMemberBySlug(req.params.slug);
        if (!member) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên', layout: 'admin' });
        }
        res.render('admin/members/confirm-delete', { title: 'Xác nhận xóa', member, layout: 'admin' });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
    }
};

export const destroy = async (req, res) => {
    try {
        const result = await MemberService.deleteMember(req.params.slug);
        if (!result) {
            return res.status(404).render('error', { message: 'Không tìm thấy thành viên để xóa', layout: 'admin' });
        }
        res.redirect('/admin/members');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Có lỗi xảy ra', layout: 'admin' });
    }
};