import express from 'express';
import indexRouter from './routes/router.js';
import path from 'path';

const PORT = 8000;
const app = express();

app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log('http://localhost:8000');
});
