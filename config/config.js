import dotenv from 'dotenv';
dotenv.config();
const env = process.env;

const development = {
	username: 'user',
	password: '1234',
	database: 'kdt8',
	host: '127.0.0.1',
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

export default {development, production, test};
