//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';

const CcommentList = async (req, res) => {
    const postId = req.params.postId;
    try {
        console.log('postId', postId);
        const comments = await models.Comment.findAll({
            where: { postId },
        });
        console.log(comments);
        res.json({ comments });
    } catch (error) {
        console.log(error);
    }
};

const CcreateComment = async (req, res) => {
    console.log(req.body);
    const result = await models.Comment.create({
        userId: req.cookies.loginCookie,
        content: req.body.content,
        postId: req.body.postId,
    }).then((result) => {
        console.log(result);
        res.json({
            id: result.dataValues.id,
            userId: req.cookies.loginCookie,
            content: req.body.content,
        });
    });
};

const CgetCommentsList = async (req, res) => {
    const postId = req.params.postId;
    try {
        const result = await axios.get(`/community/detail/${postId}/comments`);
        const comments = result.data.comments;
        res.render('boardDetail/boardDetail', { comments });
    } catch (error) {
        console.log(error);
    }
};

export { CcreateComment, CcommentList, CgetCommentsList };
