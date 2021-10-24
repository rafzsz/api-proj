module.exports = function (app) {
    const { Sequelize, DataTypes } = require('sequelize');
    const sequelize = app.get('sequelize');

    const Partner = sequelize.define('Partner', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        information: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
    });
    return Partner;
}