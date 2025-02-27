// src/app/adminControllers/ScheduleController.js
import ScheduleService from '../services/ScheduleService.js'; // Import class

const scheduleService = new ScheduleService(); // Tạo instance


// Hiển thị danh sách lịch trình
export const index = async (req, res) => {
  try {
    const schedules = await scheduleService.getAllSchedules(); // Sử dụng instance
    res.render('admin/schedule/index', { title: 'Quản lý Lịch Trình', schedules, layout: 'admin' });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Lỗi khi tải danh sách lịch trình.', layout: 'admin' });
  }
};

// ... (các hàm khác cũng sử dụng scheduleService)
// Ví dụ:
 export const create = (req, res) => {
     res.render('admin/schedule/create', { title: 'Thêm Lịch Trình', layout: 'admin' });
 };
 export const store = async (req, res) => {
     try {
         const newSchedule = await scheduleService.createSchedule(req.body);
         res.redirect('/admin/schedule');
     } catch (error) {
         console.error(error);
         res.status(500).render('admin/schedule/create', {
             title: 'Thêm Lịch Trình',
             schedule: req.body,
             errors: [{ msg: error.message }],
             layout: 'admin',
         });
     }
};
export const show = async (req, res) => {
     try {
         const schedule = await scheduleService.getScheduleById(req.params.id);
         if (!schedule) {
         return res.status(404).render('error', { message: 'Không tìm thấy lịch trình', layout: 'admin' });
         }
         res.render('admin/schedule/show', { title: 'Chi tiết lịch trình', schedule, layout: 'admin' });
     } catch (error) {
         console.error(error);
         res.status(500).render('error', { message: error.message || 'Lỗi Server', layout: 'admin' });
     }
 };
 export const edit = async (req, res) => {
     try {
         const schedule = await scheduleService.getScheduleById(req.params.id);
         if (!schedule) {
         return res.status(404).render('error', { message: 'Không tìm thấy lịch trình', layout: 'admin' });
         }
         res.render('admin/schedule/edit', { title: 'Chỉnh Sửa Lịch Trình', schedule, layout: 'admin' });
     } catch (error) {
         console.error(error);
         res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
     }
 };
 export const update = async (req, res) => {
     try {
         const updatedSchedule = await scheduleService.updateSchedule(req.params.id, req.body);
         if (!updatedSchedule) {
         return res.status(404).render('error', { message: 'Không tìm thấy lịch trình', layout: 'admin' });
         }
         res.redirect('/admin/schedule');
     } catch (error) {
         console.error(error);
         res.status(500).render('admin/schedule/edit', {
             title: 'Chỉnh sửa Lịch Trình',
             schedule: req.body,
             errors: [{msg: error.message}],
             layout: 'admin'
         });
     }
 };

 export const confirmDelete = async (req, res) => {
     try {
         const schedule = await scheduleService.getScheduleById(req.params.id);
         if (!schedule) {
         return res.status(404).render('error', { message: 'Không tìm thấy lịch trình', layout: 'admin' });
         }
         res.render('admin/schedule/confirm-delete', { title: 'Xác nhận xóa', schedule, layout: 'admin' });
     } catch (error) {
         console.error(error);
         res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
     }
 };
 export const destroy = async (req, res) => {
     try {
         const result = await scheduleService.deleteSchedule(req.params.id);
         if (!result) {
         return res.status(404).render('error', { message: 'Không tìm thấy lịch trình', layout: 'admin' });
         }
         res.redirect('/admin/schedule');
     } catch (error) {
         console.error(error);
         res.status(500).render('error', { message: 'Lỗi server', layout: 'admin' });
     }
 };