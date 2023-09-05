//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';
const __dirname = path.join(path.resolve(), 'public');

//암호화 비교
import bcrypt from 'bcrypt';

//JWT 발급
import jwt from 'jsonwebtoken';
// jwt 토큰 secret key
const SECRET = 'secret_key';

//쿠키발급
const cookieConfig = {
    httpOnly: true,
    maxAge: 60 * 60 * 1000 * 24,
};

//로그인---------------------------------------------------------
const Clogin = (req, res) => {
    res.sendFile(__dirname + '/login/login.html');
};

const CpostLogin = async (req, res) => {
    try {
        const { userId, pw } = req.body;

        const result = await models.User.findOne({
            where: { userId },
        });
        if (!result) {
            res.json({ result: false, msg: '존재하지 않는 회원입니다.' });
        }

        console.log(result.dataValues);
        const compare = await comparePassword(pw, result.dataValues.password);
        console.log('확인', compare);

        if (compare == false) {
            res.json({
                result: 'false',
                msg: '비밀번호가 일치하지 않습니다.',
            });
        } else {
            res.cookie('loginCookie', userId, cookieConfig);
            const token = jwt.sign({ id: req.body.id }, SECRET);
            console.log(token);
            res.json({ result: 'true', token });
        }
    } catch (err) {
        console.log(err);
    }
};

//암호화 비교 함수------------------------------------------
const comparePassword = async (pw, dbPw) => {
    return await bcrypt.compare(pw, dbPw);
};

export { Clogin, CpostLogin };
