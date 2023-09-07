//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';
const __dirname = path.join(path.resolve(), 'public');

const CAlcoholListDetail = (req, res) => {
    console.log('dfs', req.params);
    models.AlcoholList.findOne({
        where: {
            id: req.params.id,
        },
    }).then((result) => {
        res.render('alcoholListDetail/alcoholListDetail', { data: result });
    });
};

export { CAlcoholListDetail };
