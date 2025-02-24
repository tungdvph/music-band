// src/routes/contact.js

import express from 'express';
import * as ContactController from '../app/controllers/ContactController.js';

const router = express.Router();
router.get('/', ContactController.index);

export default router;