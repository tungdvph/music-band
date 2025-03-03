// src/app/admin/routes/music.js
import express from 'express';
import * as MusicController from '../controllers/MusicController.js';
import multer from 'multer';

const router = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads/'); // Nơi lưu ảnh và audio
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.slice(file.originalname.lastIndexOf('.')));
    }
});
const upload = multer({ storage: storage });


router.get('/', MusicController.index);
router.get('/create', MusicController.create);
// Sử dụng multer middleware với upload.fields để xử lý cả image và audio
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), MusicController.store);
router.get('/:slug', MusicController.show);
router.get('/:slug/edit', MusicController.edit);
router.put('/:slug', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), MusicController.update); // Update cũng cần upload
router.get('/:slug/delete', MusicController.confirmDelete);
router.delete('/:slug', MusicController.destroy);

export default router;