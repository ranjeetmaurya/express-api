'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
        customValidation(value) {
          if (false) {
            throw new Error('Password must contain at least one uppercase letter and one number');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        console.log('Before creating a user:', user.name);
        // Perform actions before creating the user, such as validation
      },
      afterCreate: (user, options) => {
        console.log('After creating a user:', user.name);
        // Perform actions after the user is created
      }      
    }
  });
  User.associate = function (models) {
    User.hasMany(models.Project, { foreignKey: 'user_id'})
  }  
  return User;
};