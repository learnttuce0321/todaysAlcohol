import { Sequelize } from 'sequelize';
import models from '../../models/index.js';
const Op = Sequelize.Op;

const Cmain = (req, res) => {
    res.render('mainPage/mainPage');
};

const CmainPost = async (req, res) => {
    const randomNumberList = quickSort(generateUniqueRandomNumbers(1, 50, 6));
    const recommendedAlcoholList = [];

    const result = await models.AlcoholList.findAll({
        attributes: ['id', 'name', 'info'],
        where: {
            id: {
                [Op.in]: randomNumberList,
            },
        },
    });
    result.forEach((item) => {
        recommendedAlcoholList.push(item.dataValues);
    });
    res.json({ randomAlcoholList: recommendedAlcoholList });
};

/**
 * 중복 없는 3개의 랜덤 숫자 반환
 * @param {number} min
 * @param {number} max
 * @param {number} count
 * @returns {number[]} uniqueRandomNumberList
 */
function generateUniqueRandomNumbers(min, max, count) {
    if (count > max - min + 1) {
        throw new Error('범위 내에 충분한 유일한 숫자가 없습니다.');
    }

    const randomNumbers = [];
    while (randomNumbers.length < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }

    return randomNumbers;
}
/**
 * 배열을 정렬해주는 quicksort함수
 * @param {number[]} arr
 * @returns {number[]} 정렬된 배열
 */
function quickSort(arr) {
    return arr.sort((a, b) => a - b);
}

export { Cmain, CmainPost };
