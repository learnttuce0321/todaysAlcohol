// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';

const Board = (sequelize) => {
    return sequelize.define('Board', {
        // 컬럼 정의
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            onDelete: 'CASCADE',
        },
        userId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT('medium'),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    });
};

export default Board;
