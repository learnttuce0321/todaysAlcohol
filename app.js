import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';
import db from './models/index.js';

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

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:8000`);
    });
});
