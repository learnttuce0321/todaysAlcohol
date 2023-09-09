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
import SurveyResult from './SurveyResult.js';
const tempSurveyResult = SurveyResult(sequelize);
db.SurveyResult = tempSurveyResult;
// alcoholList : 칵테일 리스트 DB
import AlcoholList from './AlcoholList.js';
const tempAlcoholList = AlcoholList(sequelize);
db.AlcoholList = tempAlcoholList;
// likeAlcohol : 칵테일 좋아요 DB
import LikeAlcohol from './LikeAlcohol.js';
const tempLikeAlcohol = LikeAlcohol(sequelize);
db.LikeAlcohol = tempLikeAlcohol;

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

import Board from './board.js';
const tempBoard = Board(sequelize);
db.Board = tempBoard;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
