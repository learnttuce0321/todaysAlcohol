//sequelize
import models from '../../models/index.js';
import { Op } from 'sequelize';

//경로 설정
import path from 'path';
const __dirname = path.join(path.resolve(), 'public');

// modal filter 실행
const CAlcoholListFilter = (req, res) => {
    res.render('alcoholListFilter/alcoholListFilter');
};

// modal filtering
const CAlcoholListFiltering = async (req, res) => {
    const { abvScore, tasteScore } = req.params;
    const abvScoreArray = abvScore.split(',').map(Number);
    const tasteScoreArray = tasteScore.split(',').map(Number);

    const result = await models.AlcoholList.findAll({
        where: {
            abvScore: {
                [Op.in]: abvScoreArray,
            },
            tasteScore: {
                [Op.in]: tasteScoreArray,
            },
        },
    });
    res.json(result);
};
// modal filter값 출력
const CdisplayFilteredResult = async (req, res) => {
    const abvScores = req.query.abvScores;
    const tasteScores = req.query.tasteScores;
    try {
        const abvScoreArray = abvScores.split(',').map(Number);
        const tasteScoreArray = tasteScores.split(',').map(Number);

        const filteredData = await models.AlcoholList.findAll({
            where: {
                abvScore: {
                    [Op.in]: abvScoreArray,
                },
                tasteScore: {
                    [Op.in]: tasteScoreArray,
                },
            },
        });

        res.render('alcoholListFilter/filteredResult', { filteredData });
    } catch (error) {
        console.log('Error:', error);
    }
};

export { CAlcoholListFilter, CAlcoholListFiltering, CdisplayFilteredResult };
