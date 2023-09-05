import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';
import db from './models/index.js';
import cookieParser from 'cookie-parser';

const PORT = 8000;
const app = express();

app.use(cookieParser());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', './views/alcohol-list');

app.use('/', indexRouter);

db.sequelize.sync({force: false}).then(function () {
	app.listen(PORT, function () {
		console.log('연결성공');
	});
});
