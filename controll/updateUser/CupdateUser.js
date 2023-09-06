//sequelize
import models from '../../models/index.js';

//경로설정
import path from 'path';
const __dirname = path.join(path.resolve(), 'public');

import bcrypt from 'bcrypt';

// 회원정보 수정 페이지
const CprofileEdit = async (req, res) => {
    // todos: cookie랑 연결
    const userId = 'jusanghoo0321';
    const userInfo = await models.User.findOne({
        where: { userid: userId },
    });
    console.log(userInfo.dataValues);
    //
    res.render('updateUser/updateUser', { data: userInfo.dataValues });
    // console.log(userInfo);
};

// 회원정보 수정 정보 db 전송 (POST)
const CprofileEditPatch = async (req, res) => {
    console.log(req.body);
    const { userId, name, password, nickname, email } = req.body;
    const hash = await bcryptPassword(password);
    const result = await models.User.update(
        {
            userId,
            name,
            password: hash,
            nickname,
            email,
        },
        {
            where: { userId: userId },
        }
    );

    console.log(result);

    res.send({ result: true });
};

export { CprofileEdit, CprofileEditPatch };
const bcryptPassword = (password) => bcrypt.hash(password, 11);
