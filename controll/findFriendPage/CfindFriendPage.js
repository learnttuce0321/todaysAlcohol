import models from '../../models/index.js';
import { Op } from 'sequelize';

const CfindFriends = (req, res) => {
    res.render('findFriendPage/findFriendPage');
};

const CcreateRoomPost = async (req, res) => {
    if (req.cookies.loginCookie) {
        try {
            const resultRoom = await models.Room.create({
                roomName: req.body.roomName,
                roomInfo: req.body.roomInfo,
            });

            const resultUser = await models.UserInRoom.create({
                userId: req.cookies.userIdCookie,
                roomId: resultRoom.dataValues.id,
            });

            if (resultRoom && resultUser) {
                res.json({
                    result: true,
                    userName: req.cookies.loginCookie,
                    chatRoomId: resultRoom.dataValues.id,
                });
            } else {
                res.json({ reuslt: false });
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.json({
            result: false,
        });
    }
};
const CparticipationPost = async (req, res) => {
    if (req.cookies.loginCookie) {
        try {
            const result = await models.UserInRoom.findAll({
                attributes: [
                    ['roomId', 'roomId'],
                    [models.sequelize.col('Room.roomName'), 'roomName'],
                    [models.sequelize.col('Room.roomInfo'), 'info'],
                ],
                include: [
                    {
                        model: models.Room,
                        attributes: [],
                    },
                    {
                        model: models.User,
                        attributes: [],
                        where: { id: req.cookies.userIdCookie },
                    },
                ],
                order: [['id', 'DESC']],
            });

            if (result.length) {
                const participation = [];
                result.forEach((item) => {
                    participation.push(item.dataValues);
                });

                res.json({
                    result: true,
                    participantLength: result.length,
                    participation,
                });
            } else {
                res.json({ result: false });
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.json({ result: false });
    }
};

const CfindRoomPost = async (req, res) => {
    try {
        const result = await models.Room.findAll({
            where: {
                roomName: {
                    [Op.like]: `%${req.body.findWord}%`,
                },
            },
        });

        if (result.length) {
            const findResult = [];
            result.forEach((room) => {
                findResult.push(room.dataValues);
            });
            res.json({ result: true, findResult });
        } else {
            res.json({ result: false });
        }
    } catch (error) {
        console.log(error);
    }
};

const CjoinRoomPost = async (req, res) => {
    try {
        const result = await models.UserInRoom.create({
            userId: req.cookies.userIdCookie,
            roomId: req.body.roomId,
        });

        if (result) {
            res.json({ result: true });
        } else {
            res.json({ result: false });
        }
    } catch (error) {
        console.log(error);
    }
};

export {
    CfindFriends,
    CcreateRoomPost,
    CparticipationPost,
    CfindRoomPost,
    CjoinRoomPost,
};
