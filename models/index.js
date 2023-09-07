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
import SurveyResult from './surveyResult.js';
const tempSurveyResult = SurveyResult(sequelize);
db.surveyResult = tempSurveyResult;
// 모델
// db에 User객체 생성
// db.User = require('../models/User')(sequelize);
import User from './User.js';
const tempUser = User(sequelize);
db.User = tempUser;
// const model = require("./User");
// const temp = model(sequelize);
// db.User = temp;
import AlcoholList from './alcoholList.js';
const tempAlcoholList = AlcoholList(sequelize);
db.AlcoholList = tempAlcoholList;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
