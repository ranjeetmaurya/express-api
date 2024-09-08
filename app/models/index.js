'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename); // Get the name of this file ('index.js')
const env = process.env.NODE_ENV || 'development'; // Determine the environment (development, test, production)
const config = require(__dirname + '/../config/config.json')[env]; // Get the DB config based on the environment
const db = {};

// Initialize Sequelize instance
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load all model files in the models directory
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'); // Exclude this file and non-js files
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // Load the model
    db[model.name] = model; // Add the model to the db object
  });

// Apply associations between models, if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Call associate method to define model relationships
  }
});

// Export the Sequelize instance and the loaded models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
