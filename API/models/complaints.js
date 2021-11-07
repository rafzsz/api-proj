// module.exports = function (app) {
//     const { Sequelize, DataTypes } = require('sequelize');
//     const sequelize = app.get('sequelize');

//     const Complaint = sequelize.define('Complaint', {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//             allowNull: false
//         },
//         complaint: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//     }, {
//         timestamps: false,
//     });
//     return Complaint;
// }
