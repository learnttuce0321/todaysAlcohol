import express from 'express';
import path from 'path';
import {login, postLogin} from '../controll/login/login.js';

const router = express.Router();
const __dirname = path.join(path.resolve(), 'public');

router.get('/', (req, res) => {
	res.sendFile(__dirname + '/homePage/mainPage.html');
});

router.get('/login', login);

router.post('/login', postLogin);

export default router;
