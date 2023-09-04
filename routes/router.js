import express from 'express';
import { main, postRegister, register } from '../controll/Controll.js';

const router = express.Router();
// const __dirname = path.join(path.resolve(), 'public');

router.get('/', main);

// 회원가입
router.get('/register', register);
router.post('/register', postRegister);

export default router;
