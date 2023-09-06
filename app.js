import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';
import db from './models/index.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
console.log('DB_HOST:', process.env.MYSQL_HOST);
console.log('DB_USER:', process.env.MYSQL_USERNAME);
console.log('DB_PASS:', process.env.MYSQL_PASSWORD);

const PORT = 8000;
const app = express();
const __dirname = path.resolve();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use('/', indexRouter);

app.use('*', (req, res) => {
    res.render('404Page/404Page');
});

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:8000`);
    });
});
