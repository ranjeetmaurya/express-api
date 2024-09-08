'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Project.associate = function (models) {
    Project.belongsTo(models.User, { foreignKey: 'user_id'})
  }  
  return Project;
};