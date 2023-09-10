import models from '../../models/index.js';

////////////////////////////
// GET
const CmyPage = async (req, res) => {
    // todos: S3 연결 후 사진 경로 포함 시키기
    const likedAlcoholList = await models.LikeAlcohol.findAll({
        attributes: ['alcoholId'],
        include: [
            {
                model: models.AlcoholList,
                attributes: ['name', 'info'],
                where: {
                    // LikeAlcohols 테이블의 alcoholId와 AlcoholLists 테이블의 id를 연결
                    id: models.Sequelize.col('LikeAlcohol.alcoholId'),
                },
            },
        ],
        where: {
            userId: req.cookies.userIdCookie, // 특정 사용자의 데이터만 선택
        },
    });

    const likedAlcohol = [];
    likedAlcoholList.forEach((item) => {
        likedAlcohol.push({
            alcoholId: item.dataValues.alcoholId,
            alcohol: item.dataValues.AlcoholList.dataValues,
        });
    });

    const likedBoardList = await models.LikeBoard.findAll({
        attributes: ['boardId'],
        include: [
            {
                model: models.Board,
                attributes: ['title'],
                where: {
                    id: models.Sequelize.col('LikeBoard.boardId'),
                },
            },
        ],
        where: {
            userId: req.cookies.userIdCookie,
        },
    });

    const likedBoard = [];
    likedBoardList.forEach((item) => {
        likedBoard.push({
            boardId: item.dataValues.boardId,
            board: item.dataValues.Board.dataValues,
        });
    });

    res.render('myPage/myPage', {
        data: {
            likeAlcoholLength: likedAlcohol.length || 0,
            likedAlcohol,
            likeBoardLength: likedBoard.length || 0,
            likedBoard,
        },
    });
};

export { CmyPage };
