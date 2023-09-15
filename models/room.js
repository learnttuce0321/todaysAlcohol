import { DataTypes } from 'sequelize';

const Room = (sequelize) => {
    return sequelize.define('Room', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        roomName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roomInfo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};

export default Room;
