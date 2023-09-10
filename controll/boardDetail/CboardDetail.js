//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';

const CboardDetail = (req, res) => {
    models.Board.findOne({
        where: {
            id: req.params.id,
        },
    }).then((result) => {
        res.render('boardDetail/boardDetail', { data: result.dataValues });
    });
};

const CboardLikePost = async (req, res) => {
    const result = await models.LikeBoard.create({
        userId: req.cookies.userIdCookie,
        boardId: req.params.id,
    });

    if (result) {
        res.json({ result: true });
    } else {
        res.json({ result: false });
    }
};

const CfindBoardLikePost = async (req, res) => {
    const userId = req.cookies.userIdCookie;

    if (userId) {
        const result = await models.LikeBoard.findOne({
            where: {
                userId: userId,
                boardId: req.params.id,
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

const CdeleteBoardLikePost = async (req, res) => {
    const destroyTarget = await models.LikeBoard.findOne({
        where: {
            userId: req.cookies.userIdCookie,
            boardId: req.params.id,
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

const CfindBoardPost = async (req, res) => {
    const userId = req.cookies.loginCookie;

    if (userId) {
        const result = await models.Board.findOne({
            where: {
                id: req.params.id,
                userId: req.cookies.loginCookie,
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

const CfindBoardContentPost = async (req, res) => {
    const result = await models.Board.findOne({
        attributes: ['content'],
        where: {
            id: req.params.id,
        },
    });
    res.json({ result: true, content: result.dataValues.content });
};

const CdeleteBoardPost = async (req, res) => {
    const destroyTarget = await models.Board.findOne({
        where: {
            id: req.params.id,
        },
    });
    console.log('destroyTarget', destroyTarget);
    const result = await destroyTarget.destroy({
        where: {
            id: req.params.id,
        },
    });

    console.log('result', result);
    res.json({ result: true });
};
export {
    CboardDetail,
    CboardLikePost,
    CfindBoardLikePost,
    CdeleteBoardLikePost,
    CfindBoardPost,
    CfindBoardContentPost,
    CdeleteBoardPost,
};
