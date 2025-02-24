// src/routes/members.js
import express from 'express';
import * as MembersController from '../app/controllers/MembersController.js';

const router = express.Router();

router.get('/', MembersController.index);
router.get('/:slug', MembersController.show);

export default router;