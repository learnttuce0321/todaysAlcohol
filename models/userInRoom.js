// const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';

const UserInRoom = (sequelize) => {
    return sequelize.define(
        'UserInRoom',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
        },
        { timestamps: false }
    );
};

export default UserInRoom;
