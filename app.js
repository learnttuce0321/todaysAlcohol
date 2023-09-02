import express from 'express';
import path from 'path';

const PORT = 8000;
const app = express();
const __dirname = path.resolve();

const tem = path.join(__dirname+"/static")

app.get('/', (req,res) => {
    res.sendFile(tem + "/index.html");
});

app.get('/profileEdit', (req,res) => {
    res.sendFile(tem + '/profileEdit.html'); 
});

app.listen(PORT, () => {
    console.log('http://localhost:8000');
});
