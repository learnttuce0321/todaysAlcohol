import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';
import cookieParser from 'cookie-parser';

const PORT = 8000;
const app = express();
<<<<<<< HEAD

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//쿠키만료일자 하루
const cookieConfig = {
	httpOnly: true,
	maxAge: 60 * 60 * 24,
};

const __dirname = path.resolve();
=======
>>>>>>> 17398dcdc67ea0bb9d16fa26b366165597531a82

app.use('/', indexRouter);

<<<<<<< HEAD
app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/static/login.html');
});

app.post('/login', (req, res) => {
	//쿠키이름 userCookie
	res.cookie('userCookie', 'value', cookieConfig);

	//req.bpdy 데이터 비교
	res.send({result: ' true'});
});
=======
>>>>>>> 17398dcdc67ea0bb9d16fa26b366165597531a82
app.listen(PORT, () => {
	console.log('http://localhost:8000');
});
