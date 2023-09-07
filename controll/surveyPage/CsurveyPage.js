import { MgetRecommendAlcoholList } from '../../model/surveyPage/MsurveyPage.js';
import models from '../../models/index.js';
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

const CresultForUserPost = (req, res) => {
    const alcoholList = MgetRecommendAlcoholList(req.body.calculatedScore);
    res.json({ result: true, alcoholList });
};

const CcurrentResultForUserPost = async (req, res) => {
    const result = await models.SurveyResult.findOne({
        where: { userId: req.cookies.loginCookie },
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
    const data = [10, 11, 7];
    return data;
};

export {
    Csurvey,
    CsurveyResult,
    CstoreSurveyPost,
    CresultForUserPost,
    CcurrentResultForUserPost,
};
