import express from 'express';
import { getProfile, loginUser, registerUser } from '../controllers/auth.controller.js';
import { isAuth } from '../middleware/isAuth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/me',isAuth, getProfile);

export default router;