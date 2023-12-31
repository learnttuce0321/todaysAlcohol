//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';
const __dirname = path.join(path.resolve(), 'public');

const CAlcoholListDetail = (req, res) => {
    models.AlcoholList.findOne({
        where: {
            id: req.params.id,
        },
    }).then((result) => {
        res.render('alcoholListDetail/alcoholListDetail', { data: result });
    });
};

const CalcoholListLikePost = async (req, res) => {
    const result = await models.LikeAlcohol.create({
        userId: req.cookies.userIdCookie,
        alcoholId: req.params.id,
    });

    if (result) {
        res.json({ result: true });
    } else {
        res.json({ result: false });
    }
};

const CfindAlcoholListLikePost = async (req, res) => {
    const userId = req.cookies.userIdCookie;

    if (userId) {
        const result = await models.LikeAlcohol.findOne({
            where: {
                userId: userId,
                alcoholId: req.params.id,
            },
        });

        if (result) {
            res.json({ result: true });
        } else {
            res.json({ result: false });
        }
    } else {
        res.json({ result: false });
    }
};

const CdeleteAlcoholListLikePost = async (req, res) => {
    const destroyTarget = await models.LikeAlcohol.findOne({
        where: {
            userId: req.cookies.userIdCookie,
            alcoholId: req.params.id,
        },
    });

    const result = await destroyTarget.destroy({
        where: {
            userId: req.cookies.userIdCookie,
            alcoholId: req.params.id,
        },
    });
    res.json({ result: true });
};

export {
    CAlcoholListDetail,
    CalcoholListLikePost,
    CfindAlcoholListLikePost,
    CdeleteAlcoholListLikePost,
};
