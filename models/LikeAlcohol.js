// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';

const LikeAlcohol = (sequelize) => {
    return sequelize.define('LikeAlcohol', {
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
        alcoholId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};

export default LikeAlcohol;
