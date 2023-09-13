'use strict';

import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
import cfg from '../config/config.js';
const config = cfg[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

//
// 모델
// Users: 회원 정보 DB
import User from './User.js';
const tempUser = User(sequelize);
db.User = tempUser;
// serveyResult : 설문조사 결과 DB
import SurveyResult from './surveyResult.js';
const tempSurveyResult = SurveyResult(sequelize);
db.SurveyResult = tempSurveyResult;
// alcoholList : 칵테일 리스트 DB
import AlcoholList from './alcoholList.js';
const tempAlcoholList = AlcoholList(sequelize);
db.AlcoholList = tempAlcoholList;
// likeAlcohol : 칵테일 좋아요 DB
import LikeAlcohol from './LikeAlcohol.js';
const tempLikeAlcohol = LikeAlcohol(sequelize);
db.LikeAlcohol = tempLikeAlcohol;
// board : 게시판 DB
import Board from './board.js';
const tempBoard = Board(sequelize);
db.Board = tempBoard;
// comment: 게시판 댓글 DB
import Comment from './comment.js';
const tempComment = Comment(sequelize);
db.Comment = tempComment;
// likeBoard : 게시판 좋아요 DB
import LikeBoard from './likeBoard.js';
const tempLikeBoard = LikeBoard(sequelize);
db.LikeBoard = tempLikeBoard;
// Room : 생성한 socket채팅방 DB
import Room from './room.js';
const tempRoom = Room(sequelize);
db.Room = tempRoom;
// UserInRoom : Users-Rooms 다대다 join 테이블
import UserInRoom from './userInRoom.js';
const tempUserInRoom = UserInRoom(sequelize);
db.UserInRoom = tempUserInRoom;
// ChatLog : Users-Rooms 다대다 join 테이블
import ChatLog from './chatLog.js';
const tempChatLog = ChatLog(sequelize);
db.ChatLog = tempChatLog;

db.AlcoholList.hasMany(db.LikeAlcohol, {
    foreignKey: {
        name: 'alcoholId',
        allowNull: false,
    },
});
db.LikeAlcohol.belongsTo(db.AlcoholList, {
    foreignKey: {
        name: 'alcoholId',
        allowNull: false,
    },
});

db.Board.hasMany(db.LikeBoard, {
    foreignKey: {
        name: 'boardId',
        allowNull: false,
    },
});
db.LikeBoard.belongsTo(db.Board, {
    foreignKey: {
        name: 'boardId',
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

db.UserInRoom.belongsTo(db.User, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
});
db.UserInRoom.belongsTo(db.Room, {
    foreignKey: {
        name: 'roomId',
        allowNull: false,
    },
});

db.ChatLog.belongsTo(db.User, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
});
db.ChatLog.belongsTo(db.Room, {
    foreignKey: {
        name: 'roomId',
        allowNull: false,
    },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
