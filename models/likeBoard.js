import { DataTypes } from 'sequelize';

const LikeBoard = (sequelize) => {
    return sequelize.define('LikeBoard', {
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
    });
};

export default LikeBoard;
