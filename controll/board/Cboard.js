//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';

// formattedCreatedAt
import moment from 'moment';

const CgetPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10; // 한 페이지에 게시물 개수
    const offset = (page - 1) * perPage;

    try {
        const totalCount = await models.Board.count(); // 총 게시물 개수
        const posts = await models.Board.findAll({
            limit: perPage,
            offset,
            order: [['createdAt', 'DESC']], // 정렬 순서
        });
        const formattedPosts = posts.map((post) => ({
            ...post.dataValues,
            formattedCreatedAt: moment(post.createdAt).format(
                // 'YYYY-MM-DD HH:mm:ss'
                'YYYY-MM-DD'
            ),
        }));

        // 게시물 수 및 페이지당 총 페이지 수 계산
        const totalPages = Math.ceil(totalCount / perPage);

        res.render('board/boardList', {
            posts,
            page,
            totalPages,
            posts: formattedPosts,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { CgetPosts };
