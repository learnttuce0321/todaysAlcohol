import { DataTypes } from 'sequelize';

const AlcoholList = (sequelize) => {
    return sequelize.define(
        'AlcoholList',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            info: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            abv: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            recipe: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            ingredient: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            abvScore: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tasteScore: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            numberIngredient: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
};

export default AlcoholList;
