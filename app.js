import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';
import db from './models/index.js';

const PORT = 8000;
const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

// app.listen(PORT, () => {
// 	console.log('http://localhost:8000');
// });

db.sequelize.sync({force: false}).then(function () {
	app.listen(PORT, function () {
		console.log('연결성공');
	});
});
