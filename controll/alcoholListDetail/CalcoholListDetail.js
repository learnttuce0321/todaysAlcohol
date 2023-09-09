//sequelize
import models from '../../models/index.js';

//경로 설정
import path from 'path';
const __dirname = path.join(path.resolve(), 'public');

const CAlcoholListDetail = (req, res) => {
	//console.log('dfs', req.params);
	models.AlcoholList.findOne({
		where: {
			id: req.params.id,
		},
	}).then((result) => {
		//console.log('asdf', result);
		res.render('alcoholListDetail/alcoholListDetail', {data: result});
	});
};

const CalcoholListLikePost = async (req, res) => {
	//console.log(req.cookies.userIdCookie);
	let userId = req.cookies.userIdCookie;
	if (userId) {
		const result = await models.LikeAlcohol.create({
			userId: userId,
			alcoholId: req.params.id,
		});

		if (result) {
			res.json({result: true});
		} else {
			res.json({result: false});
		}
	} else {
		res.json({result: false});
	}
};

const CfindAlcoholListLikePost = async (req, res) => {
	console.log(req.cookies.userIdCookie);
	if (req.cookies.userIdCookie) {
		let userId = req.cookies.userIdCookie;
		const result = await models.LikeAlcohol.findOne({
			where: {
				userId: userId,
				alcoholId: req.params.id,
			},
		});

		if (result) {
			res.json({result: true});
		} else {
			res.json({result: false});
		}
	} else {
		res.json({result: false});
	}
};

const CdeleteAlcoholListLikePost = async (req, res) => {
	if (req.cookies.userIdCookie) {
		let userId = req.cookies.userIdCookie;
		const destroyTarget = await models.LikeAlcohol.findOne({
			where: {
				userId: userId,
				alcoholId: req.params.id,
			},
		});

		const result = await destroyTarget.destroy({
			where: {
				userId: userId,
				alcoholId: req.params.id,
			},
		});
		res.json({result: true});
	} else {
		res.json({result: false});
	}
};

export {
	CAlcoholListDetail,
	CalcoholListLikePost,
	CfindAlcoholListLikePost,
	CdeleteAlcoholListLikePost,
};
