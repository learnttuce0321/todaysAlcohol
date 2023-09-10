// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';

const LikeBoard = (sequelize) => {
    return sequelize.define('LikeBoard', {
        // 컬럼 정의
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // boardId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
    });
};

export default LikeBoard;
