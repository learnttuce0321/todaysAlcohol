import dotenv from 'dotenv';
dotenv.config();
const env = process.env;

const development = {
    username: env.MYSQL_RDS_USERNAME,
    //env.MYSQL_USERNAME은 불러오고자 하는 데이터의 키값이므로 자유롭게 이름설정이 가능하다.
    password: env.MYSQL_RDS_PASSWORD,
    database: env.MYSQL_RDS_DATABASE,
    host: env.MYSQL_RDS_HOST,
    dialect: 'mysql',
    //port: env.MYSQL_PORT
};

const production = {
    username: env.MYSQL_USERNAME,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    host: env.MYSQL_HOST,
    dialect: 'mysql',
    //port: env.MYSQL_PORT
};

const test = {
    username: env.MYSQL_USERNAME, // 각자 localhost user이름
    password: env.MYSQL_PASSWORD, // localhost password
    database: env.MYSQL_DATABASE, //
    host: env.MYSQL_HOST,
    dialect: 'mysql',
    //port: env.MYSQL_PORT
};

export default { development, production, test };
