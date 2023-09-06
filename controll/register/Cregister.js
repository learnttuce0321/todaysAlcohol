import path from 'path';
import models from '../../models/index.js';
import bcrypt from 'bcrypt';
const __dirname = path.join(path.resolve(), 'public');
////////////////////////////
// GET
const CRegister = (req, res) => {
    res.render('registerPage/registerPage');
};

////////////////////////////
// POST
const CRegisterPost = async (req, res) => {
    console.log(req.body);
    const { userId, name, password, nickname, email } = req.body;
    // create: 데이터 생성
    const hash = await bcryptPassword(password);
    models.User.create({
        userId,
        name,
        password: hash,
        nickname,
        email,
    }).then(() => {
        res.json({ result: true });
    });
};

export { CRegister, CRegisterPost };

////////////////////////Function
const bcryptPassword = (password) => bcrypt.hash(password, 11);
