// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';

const Comment = (sequelize) => {
    return sequelize.define('Comment', {
        // 컬럼 정의
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT('medium'),
            allowNull: false,
        },
    });
};

export default Comment;
