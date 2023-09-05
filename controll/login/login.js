//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';
const __dirname = path.join(path.resolve(), 'public');

//암호화 비교
import bcrypt from 'bcrypt';

//JWT 발급
import jwt from 'jsonwebtoken';

const SECRET = 'secret_key';

//쿠키발급
const cookieConfig = {
	httpOnly: true,
	maxAge: 60 * 60 * 1000 * 24,
};

//로그인---------------------------------------------------------
export const login = (req, res) => {
	res.sendFile(__dirname + '/login/login.html');
};

export const postLogin = async (req, res) => {
	try {
		const {userId, pw} = req.body;

		const result = await models.User.findOne({
			where: {userId},
		});
		if (!result) {
			res.json({result: false, msg: '존재하지 않는 회원입니다.'});
		}

		// const compare = comparePassword(pw, result.password);

		const compare = true;

		if (compare == false) {
			res.json({
				result: 'false',
				msg: '비밀번호가 일치하지 않습니다.',
			});
		} else {
			res.cookie('myCookie', userId, cookieConfig);
			const token = jwt.sign({id: req.body.id}, SECRET);
			res.json({result: 'true', token});
		}
	} catch (err) {
		console.log(err);
	}
};

//암호화 비교 함수------------------------------------------
const comparePassword = (pw, dbPw) => {
	return bcrypt.compareSync(pw, dbPw);
};
