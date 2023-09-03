import express from 'express';
import path from 'path';
import * as controller from '../controll/login/login.js';

const router = express.Router();
const __dirname = path.join(path.resolve(), 'public');

router.get('/', (req, res) => {
	res.sendFile(__dirname + '/homePage/mainPage.html');
});

router.get('/login', controller.login_render);

router.post('/login', controller.login_send);

export default router;
