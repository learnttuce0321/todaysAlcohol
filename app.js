import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';
import db from './models/index.js';
import dotenv from 'dotenv';
dotenv.config();
console.log('DB_HOST:', process.env.MYSQL_HOST);
console.log('DB_USER:', process.env.MYSQL_USERNAME);
console.log('DB_PASS:', process.env.MYSQL_PASSWORD);

const __dirname = path.resolve();
const PORT = 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('*', (req, res) => {
    res.render('404Page/404');
});

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:8000`);
    });
});
