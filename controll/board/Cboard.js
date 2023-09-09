//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';

const CboardList = (req, res) => {
    models.Board.findAll().then((result) => {
        res.render('board/boardList', { data: result });
    });
};

export { CboardList };
