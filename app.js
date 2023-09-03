import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';

const PORT = 8000;
const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);

app.listen(PORT, () => {
	console.log('http://localhost:8000');
});
