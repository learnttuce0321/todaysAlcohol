//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';
const __dirname = path.join(path.resolve(), 'public');

//리스트 출력---------------------------------------------------------
export const alcohol_list = (req, res) => {
    models.User.findAll({
        raw: true,
    }).then(function (result) {
        res.render('alcohol-list', {
            title: '칵테일 리스트',
            list: [result],
        });
    });
};

export const alcohol_filteringList = (req, res) => {
    console.log(req.query);
    models.User.findAll({
        raw: true,
    }).then(function (result) {
        res.render('alcoholList-filter', {
            title: '칵테일 필터링 결과',
            list: [result],
        });
    });
};
