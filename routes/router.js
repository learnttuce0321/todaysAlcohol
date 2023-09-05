import express from 'express';
import path from 'path';
import {login, postLogin} from '../controll/login/login.js';
import {
	alcohol_list,
	alcohol_filteringList,
} from '../controll/alcohol-list/alcohol-list.js';

const router = express.Router();
const __dirname = path.join(path.resolve(), 'public');

router.get('/', (req, res) => {
	res.sendFile(__dirname + '/homePage/mainPage.html');
});

//로그인-------------------------------------
router.get('/login', login);

router.post('/login', postLogin);

//리스트--------------------------------------

router.get('/alcohol-list', alcohol_list);

//router.get('/alcohol-list/cocktail', alcohol_filteringList);

export default router;
