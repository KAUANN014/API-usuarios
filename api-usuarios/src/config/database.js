const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('api_usuarios', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;