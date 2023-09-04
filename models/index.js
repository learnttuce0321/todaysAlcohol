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

// 모델
// db에 User객체 생성
// db.User = require('../models/User')(sequelize);
import model from './User.js';
const temp = model(sequelize);
db.User = temp;
// const model = require("./User");
// const temp = model(sequelize);
// db.User = temp;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;