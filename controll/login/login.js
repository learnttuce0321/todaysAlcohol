//경로 설정
import path from 'path';
const __dirname = path.join(path.resolve(), 'public');

//암호화 비교
import bcrypt from 'bcrypt';

//JWT 발급
import jwt from 'jsonwebtoken';
const SECRET = 'secret_key';

//로그인---------------------------------------------------------
export const login_render = (req, res) => {
	res.sendFile(__dirname + '/login/login.html');
};

export const login_send = async (req, res) => {
	try {
		//데이터베이스에서 비교 후
		//1.아이디가 존재하는지 확인하고
		//2.비밀번호까지 일치하면 토큰 발급
		const compare = comparePassword(req.body.pw, ''); //true/false값 반환

		const token = jwt.sign({id: req.body.id}, SECRET); //id는 db아이디
		res.json({result: 'true', token});
	} catch (err) {
		console.log(err);
	}
};

//암호화 비교 함수------------------------------------------
const comparePassword = (pw, dbPw) => {
	return bcrypt.compareSync(pw, dbPw);
};
