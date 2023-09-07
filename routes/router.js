import express from 'express';
import { Clogin, CloginPost } from '../controll/login/Clogin.js';
import {
    Csurvey,
    CsurveyResult,
    CstoreSurveyPost,
    CresultForUserPost,
    CcurrentResultForUserPost,
} from '../controll/surveyPage/CsurveyPage.js';
import { Cmain } from '../controll/mainPage/CmainPage.js';
import { CRegisterPost, CRegister } from '../controll/register/Cregister.js';
import {
    CAlcoholListDetail,
    CalcoholListLikePost,
    CfindAlcoholListLikePost,
    CdeleteAlcoholListLikePost,
} from '../controll/alcoholListDetail/CalcoholListDetail.js';
// import {
// 	alcohol_list,
// 	alcohol_filteringList,
// } from '../controll/alcohol-list/alcohol-list.js';

const router = express.Router();

router.get('/', Cmain); // 메인 페이지 router
router.get('/survey', Csurvey); // 설문조사 페이지 router
router.get('/survey/result', CsurveyResult); // 설문조사 결과 페이지 router
router.post('/survey/result', CstoreSurveyPost); // 설문조사 결과 db저장 api
router.post('/survey/result/user', CresultForUserPost); // 현재 또는 최근 설문조사 결과를 바탕으로 추천술List 가져오기 api
router.post('/survey/result/recent', CcurrentResultForUserPost); // 최근 설문조사 결과 가져오기 api

// 회원가입
router.get('/register', CRegister);
router.post('/register', CRegisterPost);

//로그인-------------------------------------
router.get('/login', Clogin);
router.post('/login', CloginPost);

//리스트--------------------------------------

// router.get('/alcohol-list', alcohol_list);
//router.get('/alcohol-list/cocktail', alcohol_filteringList);

// 술 상세 페이지--------------------------------
router.get('/alcohol-list/detail/:id', CAlcoholListDetail);
router.post('/alcohol-list/:id/like', CalcoholListLikePost);
router.post('/alcohol-list/:id/like/find', CfindAlcoholListLikePost);
router.post('/alcohol-list/:id/like/delete', CdeleteAlcoholListLikePost);

export default router;
