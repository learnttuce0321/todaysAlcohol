import express from 'express';
import path from 'path';

const router = express.Router();
const __dirname = path.join(path.resolve(), 'public');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/homePage/mainPage.html');
});

export default router;
