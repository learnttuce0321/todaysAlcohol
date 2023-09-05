import { DataTypes } from 'sequelize';

const SurveyResult = (sequelize) => {
    return sequelize.define('surveyResult', {
        // 컬럼 정의
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        score1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        score3: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
};

export default SurveyResult;
