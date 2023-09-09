//sequelize
import models from '../../models/index.js';

const Ccommunity = (req, res) => {
	// 데이터베이스 연결
	res.render('community/community');
};

export {Ccommunity};
