//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';

const CboardDetail = (req, res) => {
    models.Board.findOne({
        where: {
            id: req.params.id,
        },
    }).then((result) => {
        res.render('boardDetail/boardDetail', { data: result.dataValues });
    });
};

export { CboardDetail };
