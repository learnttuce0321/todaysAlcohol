//sequelize
import models from '../../models/index.js';

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
    res.render('loginPage/loginPage');
};

const CloginPost = async (req, res) => {
    try {
        const { userId, pw } = req.body;

        const result = await models.User.findOne({
            where: { userId },
        });
        if (!result) {
            res.json({ result: false, msg: '존재하지 않는 회원입니다.' });
        }

        const compare = await comparePassword(pw, result.dataValues.password);

        if (compare == false) {
            res.json({
                result: 'false',
                msg: '비밀번호가 일치하지 않습니다.',
            });
        } else {
            res.cookie('loginCookie', userId, cookieConfig);
            res.cookie('userIdCookie', result.dataValues.id);
            const token = jwt.sign({ id: req.body.id }, SECRET);
            res.json({ result: 'true', token });
        }
    } catch (error) {
        console.log(error);
    }
};

//암호화 비교 함수------------------------------------------
const comparePassword = async (pw, dbPw) => {
    return await bcrypt.compare(pw, dbPw);
};

export { Clogin, CloginPost };
