import models from '../../models/index.js';
import { Op } from 'sequelize';

const CchatRoom = (req, res) => {
    res.render('findFriendPage/chatRoomPage');
};

const CchatRoomPost = async (req, res) => {
    try {
        const result = await models.ChatLog.create({
            content: req.body.content,
            roomId: req.params.chatRoomId,
            userId: req.cookies.userIdCookie,
        });

        console.log(result.dataValues);
        const resultName = await models.User.findOne({
            attributes: ['name', 'id'],
            where: {
                id: result.dataValues.userId,
            },
        });

        if (result) {
            const value = result.dataValues;
            console.log(value.createdA);
            res.json({
                result: true,
                id: value.id,
                userId: resultName.dataValues.id,
                name: resultName.dataValues.name,
                content: value.content,
                createdAt: value.createdAt,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const CbeforeChatPost = async (req, res) => {
    try {
        const result = await models.ChatLog.findAll({
            attributes: [
                ['content', 'content'],
                ['createdAt', 'createAt'],
                [models.sequelize.col('User.name'), 'name'],
                [models.sequelize.col('User.id'), 'id'],
            ],
            include: [
                {
                    model: models.Room,
                    attributes: [],
                    where: { id: req.params.chatRoomId },
                },
                {
                    attributes: [],
                    model: models.User,
                },
            ],
        });

        if (result.length) {
            const chat = [];
            result.forEach((item) => {
                chat.push(item.dataValues);
            });
            res.json({
                result: true,
                chat,
                loginUserId: req.cookies.userIdCookie,
            });
        } else {
            res.json({ result: false });
        }
    } catch (error) {
        console.log(error);
    }
};
const CgetUserIdPost = (req, res) => {
    res.json({ loginUserId: req.cookies.userIdCookie });
};
const CgetUserNamePost = async (req, res) => {
    console.log('arr', req.body);
    try {
        const result = await models.User.findAll({
            where: {
                id: {
                    [Op.in]: req.body.userIdArr,
                },
            },
        });

        const userNameArr = [];
        result.forEach((item) => {
            userNameArr.push(item.dataValues.name);
        });

        res.json({ userNameArr });
    } catch (error) {
        console.log('에러발생');
    }
};

export {
    CchatRoom,
    CchatRoomPost,
    CbeforeChatPost,
    CgetUserIdPost,
    CgetUserNamePost,
};
