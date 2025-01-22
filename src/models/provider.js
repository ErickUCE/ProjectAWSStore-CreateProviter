const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Asegúrate de que este archivo exporte correctamente el objeto Sequelize

const Provider = sequelize.define('Provider', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
}, {
    freezeTableName: true, // Evita la pluralización automática del nombre de la tabla
});

module.exports = Provider;
