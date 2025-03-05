// src/app/admin/routes/news.js
import express from 'express';
import *as NewsController from '../controllers/NewsController.js';
import multer from 'multer'; // Import multer
const router = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.slice(file.originalname.lastIndexOf('.')));
    }
});

const upload = multer({ storage: storage });

// Các routes
router.get('/', NewsController.index);
router.get('/create', NewsController.create);
router.post('/', upload.single('image'), NewsController.store); // Xử lý upload ảnh khi thêm mới
router.get('/:slug', NewsController.show);
router.get('/:slug/edit', NewsController.edit);
router.put('/:slug', upload.single('image'), NewsController.update); // Xử lý upload ảnh khi cập nhật
router.get('/:id/delete', NewsController.confirmDelete); // Dùng ID thay vì slug
router.delete('/:id', NewsController.destroy);   // Dùng ID, route này để thực hiện xóa, không cần view

export default router;