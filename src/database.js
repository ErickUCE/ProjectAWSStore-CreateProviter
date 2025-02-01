const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ProviderDB', 'erick', 'Password@123', {
    host: '44.223.32.167', // Dirección IP de tu base de datos
    dialect: 'mysql',
    logging: false, // Cambia a true si deseas ver los logs de Sequelize
});

sequelize.authenticate()
    .then(() => console.log('Sequelize connected successfully!'))
    .catch(err => console.error('Sequelize connection error:', err));

module.exports = sequelize;
