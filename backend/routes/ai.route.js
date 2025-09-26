import { Router } from "express";
const router = Router();
import * as aiController from '../controllers/ai.controller.js'
import * as authMiddleWare from '../middleware/auth.middleware.js';

router.get('/get-result',
    // authMiddleWare.authUser,
    aiController.getResult
)

export default router;