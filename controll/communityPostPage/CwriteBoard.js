import models from '../../models/index.js';

const CwriteBoard = (req, res) => {
    const userId = req.cookies.loginCookie;

    if (userId) {
        res.render('communityPostPage/communityPostPage');
    } else {
        res.json({ result: false });
    }
};
const CwriteBoardPost = async (req, res) => {
    console.log(req.body);
    const userId = req.cookies.loginCookie;

    const result = await models.Board.create({
        userId: req.cookies.userIdCookie,
        title: req.body.title,
        content: req.body.content,
        image: 'example-Img',
    });

    res.json({ result: true, id: result.dataValues.id });
};

export { CwriteBoard, CwriteBoardPost };
