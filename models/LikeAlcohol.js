import { DataTypes } from 'sequelize';

const LikeAlcohol = (sequelize) => {
    return sequelize.define('LikeAlcohol', {
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

export default LikeAlcohol;
