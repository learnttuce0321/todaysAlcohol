// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';

const ChatLog = (sequelize) => {
    return sequelize.define('ChatLog', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

export default ChatLog;
