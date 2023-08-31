import express from 'express';
import path from 'path';

const PORT = 8000;
const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});
app.listen(PORT, () => {
    console.log('http://localhost:8000');
});
