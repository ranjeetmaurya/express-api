'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Project, { foreignKey: 'user_id'})
  }  
  return User;
};