const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('api_usuarios', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com MySQL estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar no MySQL:', error);
  }
}

testConnection();

module.exports = sequelize;