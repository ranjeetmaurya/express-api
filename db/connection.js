require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
});

sequelize.authenticate().then(() => console.log('Connected to the database.')).catch(err => console.error('Unable to connect:', err));

module.exports = sequelize;    