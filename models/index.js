'use strict';

import Sequelize from 'sequelize';
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
import cfg from '../config/config.json' assert { type: 'json' };
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
