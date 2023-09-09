import models from '../../models/index.js';

////////////////////////////
// GET
const CmyPage = async (req, res) => {
    const result = await models.LikeAlcohol.findAll({
        where: {
            userId: req.cookies.userIdCookie,
        },
    });

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

    likedAlcoholList.forEach((item) => {
        console.log(item.dataValues);
    });
    const likedAlcohol = [];
    likedAlcoholList.forEach((item, index) => {
        likedAlcohol.push({
            alcoholId: likedAlcoholList[index].dataValues.alcoholId,
            alcohol: item.dataValues.AlcoholList.dataValues,
        });
    });

    res.render('myPage/myPage', {
        data: {
            likeLength: result.length || 0,
            likedAlcohol,
        },
    });
};

export { CmyPage };
