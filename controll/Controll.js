import path from 'path';
import models from '../models/index.js';
import bcrypt from 'bcrypt';
const __dirname = path.join(path.resolve(), 'public');
////////////////////////////
// GET
const main = (req, res) => {
    res.sendFile(__dirname + '/homePage/mainPage.html');
};

const register = (req, res) => {
    res.sendFile(__dirname + '/register/register.html');
};

////////////////////////////
// POST
const postRegister = async (req, res) => {
    console.log(req.body);
    const { userId, name, password, nickname, email } = req.body;
    // create: 데이터 생성
    const hash = await bcryptPassword(password);
    models.User.create({
        userId,
        name,
        password: hash,
        nickname,
        phone,
        email,
    }).then(() => {
        res.json({ result: true });
    });
};

export { main, register, postRegister };

////////////////////////Function
const bcryptPassword = (password) => bcrypt.hash(password, 11);
