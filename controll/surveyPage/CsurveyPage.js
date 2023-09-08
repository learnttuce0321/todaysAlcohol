import { MgetRecommendAlcoholList } from '../../model/surveyPage/MsurveyPage.js';
import models from '../../models/index.js';
import { Op } from 'sequelize';
////////////////////////////
// GET
const Csurvey = (req, res) => {
    res.render('surveyPage/surveyPage');
};
const CsurveyResult = (req, res) => {
    res.render('surveyPage/surveyResultPage');
};

////////////////////////////
// POST
const CstoreSurveyPost = async (req, res) => {
    const scores = CalculateDataForAlgorithm(req.body.checkedRadiosValue);
    console.log(scores);
    if (req.cookies.loginCookie) {
        await models.SurveyResult.create({
            userId: req.cookies.loginCookie,
            score1: scores[0],
            score2: scores[1],
            score3: scores[2],
        });
    }
    res.send({ result: true, scores });
};

const CresultForUserPost = async (req, res) => {
    console.log(req.body.calculatedScore);

    const result = await models.AlcoholList.findAll({
        where: {
            [Op.and]: [
                { numberIngredient: { [Op.lte]: req.body.calculatedScore[0] } },
                { abvScore: { [Op.lte]: req.body.calculatedScore[1] } },
                { tasteScore: { [Op.lte]: req.body.calculatedScore[2] } },
            ],
        },
        order: [
            ['numberIngredient', 'DESC'],
            ['abvScore', 'DESC'],
            ['tasteScore', 'DESC'],
        ],
        limit: 12,
    });

    const [index1, index2, index3] = generateUniqueRandomNumbers(
        1,
        result.length - 1,
        3
    );
    console.log('length: ', result.length - 1);
    console.log('random: ', index1, index2, index3);

    const recommendedAlcoholList = {
        mainAlcohol: result[0].dataValues,
        subAlcohol: [
            result[index1].dataValues,
            result[index2].dataValues,
            result[index3].dataValues,
        ],
    };

    res.json({ result: true, alcoholList: recommendedAlcoholList });
};

const CcurrentResultForUserPost = async (req, res) => {
    const result = await models.SurveyResult.findOne({
        where: { userId: req.cookies.loginCookie },
        order: [['createdAt', 'DESC']],
    });
    if (result) {
        res.json({
            result: true,
            score1: result.dataValues.score1,
            score2: result.dataValues.score2,
            score3: result.dataValues.score3,
        });
    } else {
        res.json({
            result: false,
        });
    }
};

////////////////////////
// Function
/**
 * 10개 문항의 응답을 받아 총 3개의 항목의 점수를 부여하는 방식의 알고리즘
 * @param {number[]} recentSurvey
 * @returns {number[]} 3scores
 */
const CalculateDataForAlgorithm = (recentSurvey) => {
    let score1 = 0,
        score2 = 0,
        score3 = 0;

    recentSurvey.forEach((item, index) => {
        switch (index) {
            case 1:
            case 2:
            case 3:
                score1 += Number(item);
                break;
            case 4:
            case 5:
            case 6:
                score2 += Number(item);
                break;
            case 7:
            case 8:
            case 9:
                score3 += Number(item);
                break;
        }
    });

    console.log(score1, score2, score3);
    const data = [
        Math.min(Math.round(score1 / 3), 9),
        Math.min(Math.round(score2 / 3), 5),
        Math.min(Math.round(score3 / 3), 5),
    ];
    return data;
};

/**
 * 중복 없는 3개의 랜덤 숫자 반환
 * @param {number} min
 * @param {number} max
 * @param {number} count
 * @returns {number[]} 3 uniqueRandomNumber
 */
function generateUniqueRandomNumbers(min, max, count) {
    if (count > max - min + 1) {
        throw new Error('범위 내에 충분한 유일한 숫자가 없습니다.');
    }

    const randomNumbers = [];
    while (randomNumbers.length < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }

    return randomNumbers;
}

export {
    Csurvey,
    CsurveyResult,
    CstoreSurveyPost,
    CresultForUserPost,
    CcurrentResultForUserPost,
};
