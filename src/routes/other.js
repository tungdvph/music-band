// src/routes/other.js

import express from 'express';
import * as OtherController from '../app/controllers/OtherController.js';

const router = express.Router();

router.get('/', OtherController.index);
export default router;