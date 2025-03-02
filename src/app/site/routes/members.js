// src/app/site/routes/members.js
import express from 'express';
import * as MembersController from '../controllers/MembersController.js'; // SỬA Ở ĐÂY
// import { body } from 'express-validator'; // (Nếu bạn dùng express-validator, bỏ comment)

const router = express.Router();

router.get('/', MembersController.index);
router.get('/:slug', MembersController.show);

export default router;