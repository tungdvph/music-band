//src/app/site/routes/other.js

import express from 'express';
import * as OtherController from '../../controllers/OtherController.js';

const router = express.Router();

router.get('/', OtherController.index);
export default router;