//sequelize
import models from '../../models/index.js';

//리스트 출력---------------------------------------------------------
const CalcoholList = (req, res) => {
	models.AlcoholList.findAll({}).then((result) => {
		res.render('alcoholList/alcoholList', {data: result});
	});
};

export {CalcoholList};
