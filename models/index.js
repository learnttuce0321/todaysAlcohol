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
db.surveyResult = tempSurveyResult;
// alcoholList : 칵테일 리스트 DB
import AlcoholList from './AlcoholList.js';
const tempAlcoholList = AlcoholList(sequelize);
db.AlcoholList = tempAlcoholList;

import LikeAlcohol from './LikeAlcohol.js';
const tempLikeAlcohol = LikeAlcohol(sequelize);
db.LikeAlcohol = tempLikeAlcohol;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
