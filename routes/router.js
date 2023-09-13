import express from 'express';

import { Clogin, CloginPost } from '../controll/login/Clogin.js';

import {
    Csurvey,
    CsurveySelect,
    CsurveyResult,
    CstoreSurveyPost,
    CresultForUserPost,
    CcurrentResultForUserPost,
} from '../controll/surveyPage/CsurveyPage.js';

import { Cmain, CmainPost } from '../controll/mainPage/CmainPage.js';

import { CRegisterPost, CRegister } from '../controll/register/Cregister.js';

import { CalcoholList } from '../controll/alcoholList/CalcoholList.js';

import {
    CAlcoholListDetail,
    CalcoholListLikePost,
    CfindAlcoholListLikePost,
    CdeleteAlcoholListLikePost,
} from '../controll/alcoholListDetail/CalcoholListDetail.js';

import {
    CAlcoholListFilter,
    CAlcoholListFiltering,
    CdisplayFilteredResult,
} from '../controll/alcoholListFilter/CalcoholListFilter.js';

import { CmyPage } from '../controll/myPage/CmyPage.js';

import { CprofileEdit, CupdateUser } from '../controll/myPage/CupdateUser.js';

import { CgetPosts } from '../controll/board/Cboard.js';

import {
    CboardDetail,
    CboardLikePost,
    CfindBoardLikePost,
    CdeleteBoardLikePost,
    CfindBoardPost,
    CfindBoardContentPost,
    CdeleteBoardPost,
} from '../controll/boardDetail/CboardDetail.js';

import {
    CwriteBoard,
    CwriteBoardPost,
} from '../controll/communityPostPage/CwriteBoard.js';

import {
    CmodifyBoard,
    CmodifyBoardPost,
    CmodifyBoardPatch,
} from '../controll/communityPostPage/CmodifyBoard.js';

import { Clogout } from '../controll/logout/Clogout.js';

import { CcreateComment, CcommentList } from '../controll/board/Ccomment.js';

// import {
// 	alcohol_list,
// 	alcohol_filteringList,
// } from '../controll/alcohol-list/alcohol-list.js';

const router = express.Router();

router.get('/', Cmain); // 메인 페이지 router
router.post('/', CmainPost);
router.get('/survey-select', CsurveySelect); // 설문조사 or 최근 결과 확인 선택
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

//마이 페이지-------------------------------------
router.get('/my-page', CmyPage);
router.get('/my-page/user-info', CprofileEdit);
router.patch('/my-page/user-info', CupdateUser);

//로그아웃-------------------------------------
router.post('/logout', Clogout)

//술 리스트--------------------------------------
router.get('/alcohol-list', CalcoholList);

// 술 상세 페이지-----------------------------
router.get('/alcohol-list/detail/:id', CAlcoholListDetail);
router.post('/alcohol-list/:id/like', CalcoholListLikePost);
router.post('/alcohol-list/:id/like/find', CfindAlcoholListLikePost);
router.post('/alcohol-list/:id/like/delete', CdeleteAlcoholListLikePost);

//카테고리 별 필터링---------------------------
// router.get('/alcohol-list/filter', CAlcoholListFilter); // 모달 창 띄우기
// router.get('/alcohol-list/filter:', CAlcoholListFiltering); // 필터링 창
router.get('/alcohol-list/filteredResults', CdisplayFilteredResult); // 필터 결과창

//게시글---------------------------
router.get('/community/write', CwriteBoard);
router.post('/community/write/content', CwriteBoardPost);

//board
router.get('/community', CgetPosts);
router.get('/community/:id', CboardDetail);

//게시글 리스트---------------------------
router.get('/community', CgetPosts);

//게시글 상세 페이지---------------------------
router.get('/community/detail/:id', CboardDetail); // 술 상세 페이지
router.post('/community/detail/:id/content', CfindBoardContentPost); // ejs버그로 인해 content만 가져오는 api
router.post('/community/detail/:id/writer', CfindBoardPost); // 삭제 버튼의 유무(display)를 위한 api
router.post('/community/detail/:id/delete', CdeleteBoardPost); // 게시문 삭제 요청
router.post('/community/:id/like', CboardLikePost); // 게시물 좋아요
router.post('/community/:id/like/find', CfindBoardLikePost); // 게시물 좋아요의 유무(눌렀는지)를 위한 api
router.post('/community/:id/like/delete', CdeleteBoardLikePost); // 게시물 좋아요 삭제

//게시글 작성---------------------------
router.get('/community/write', CwriteBoard); // 게시물 작성 페이지
router.post('/community/write/content', CwriteBoardPost); // 게시물 작성 저장

//게시글 수정---------------------------
router.get('/community/write/:id', CmodifyBoard);
router.post('/community/write/:id', CmodifyBoardPost);
router.patch('/community/write/:id', CmodifyBoardPatch);

// 게시물 댓글 개발용 라우터
// router.get('/comment', CcommentList);
router.get('/community/detail/:postId', CcommentList);
router.post('/community/detail/:postId', CcreateComment);
export default router;
