module.exports = function (app) {
  const { Sequelize, DataTypes } = require("sequelize");
  const sequelize = app.get("sequelize");

  const Adotei = sequelize.define(
    "Adotei",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      URL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Adotei;
};
