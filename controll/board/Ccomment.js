//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';

const CcommentList = async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await models.Comment.findAll({
            where: { postId },
        });
        res.json({ comments });
    } catch (error) {}
};

const CcreateComment = async (req, res) => {
    const result = await models.Comment.create({
        userId: req.cookies.loginCookie,
        content: req.body.content,
        postId: req.body.postId,
    }).then((result) => {
        res.json({
            id: result.dataValues.id,
            userId: req.cookies.loginCookie,
            content: req.body.content,
        });
    });
};

const CgetCommentsList = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 5; // 한 페이지에 게시물 개수
    const offset = (page - 1) * perPage;
    const postId = req.params.postId;
    try {
        const totalCount = await models.Comment.count({
            where: { postId },
        });
        const comments = await models.Comment.findAll({
            where: { postId },
            limit: perPage,
            offset,
            order: [['createdAt', 'ASC']], // 정렬 순서
        });
        const totalPages = Math.ceil(totalCount / perPage);

        res.json({ comments, page, totalPages });
    } catch (error) {
        console.log(error);
    }
};

export { CcreateComment, CcommentList, CgetCommentsList };
