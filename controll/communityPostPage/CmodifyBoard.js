import models from '../../models/index.js';

const CmodifyBoard = (req, res) => {
    res.render('communityPostPage/modifyBoardPage.ejs');
};

const CmodifyBoardPost = async (req, res) => {
    const result = await models.Board.findOne({
        attributes: ['title', 'content'],
        where: {
            id: req.params.id,
        },
    });

    res.json({ result: true, board: result.dataValues });
};

const CmodifyBoardPatch = async (req, res) => {
    const result = await models.Board.update(
        {
            title: req.body.title,
            content: req.body.content,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );

    if (result) {
        res.json({ result: true });
    } else {
        res.json({ result: false });
    }
};

export { CmodifyBoard, CmodifyBoardPost, CmodifyBoardPatch };
