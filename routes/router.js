import express from 'express';
import {
    Csurvey,
    CsurveyResult,
    CstoreSurveyPost,
    CresultForUserPost,
    CcurrentResultForUserPost,
} from '../controll/surveyPage/CsurveyPage.js';
import { Cmain } from '../controll/mainPage/CmainPage.js';
import { CregisterPost, Cregister } from '../controll/register/Cregister.js';

const router = express.Router();

router.get('/', Cmain); // 메인 페이지 router
router.get('/survey', Csurvey); // 설문조사 페이지 router
router.get('/survey/result', CsurveyResult); // 설문조사 결과 페이지 router
router.post('/survey/result', CstoreSurveyPost); // 설문조사 결과 db저장 api
router.post('/survey/result/user', CresultForUserPost); // 현재 또는 최근 설문조사 결과를 바탕으로 추천술List 가져오기 api
router.post('/survey/result/recent', CcurrentResultForUserPost); // 최근 설문조사 결과 가져오기 api

// 회원가입
router.get('/register', Cregister);
router.post('/register', CregisterPost);

export default router;
