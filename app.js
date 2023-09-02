import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//쿠키만료일자 하루
const cookieConfig = {
	httpOnly: true,
	maxAge: 60 * 60 * 24,
};

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/login', (req, res) => {
	res.sendFile(__dirname + '/static/login.html');
});

app.post('/login', (req, res) => {
	//쿠키이름 userCookie
	res.cookie('userCookie', 'value', cookieConfig);

	//req.bpdy 데이터 비교
	res.send({result: ' true'});
});
app.listen(PORT, () => {
	console.log('http://localhost:8000');
});
