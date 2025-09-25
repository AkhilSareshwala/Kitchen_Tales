import express from 'express';
import { userLogin, userSignup, getUser } from '../controller/user.js';

const router = express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/:id', getUser);

export default router;
