module.exports = function (app) {
    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = app.get('sequelize');

    const Coment = sequelize.define('Coment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        coment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
    });
    return Coment;
}