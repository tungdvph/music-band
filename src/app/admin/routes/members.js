// src/app/admin/routes/members.js 
import express from 'express';
import * as membersController from '../controllers/MembersController.js';
import multer from 'multer'; // Import multer

const router = express.Router();

// Cấu hình multer (giống như bạn đã làm cho News)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads/'); // Nơi lưu ảnh
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.slice(file.originalname.lastIndexOf('.')));
    }
});
const upload = multer({ storage: storage });


router.get('/', membersController.index);
router.get('/create', membersController.create);
router.post('/', upload.single('image'), membersController.store); // Thêm upload.single('image')
router.get('/:slug', membersController.show);
router.get('/:slug/edit', membersController.edit);
router.put('/:slug', upload.single('image'), membersController.update); // Thêm upload.single('image')
router.get('/:slug/delete', membersController.confirmDelete);
router.delete('/:slug', membersController.destroy);

export default router; 