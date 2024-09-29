'use strict';
const bcrypt = require('bcryptjs');


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
        notNull: {
          msg: 'Email is required'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: 'Password must be at least 6 characters long'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: async (user, options) => {

      },
      afterCreate: (user, options) => {
        console.log('After creating a user:', user.name);
        // Perform actions after the user is created
      },
      afterValidate: async (user, options) => {
        console.log('Before creating a user:', user.name);
        try {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        } catch (err) {
          throw new Error('Error hashing password');
        }
      }      
    }
  });
  User.associate = function (models) {
    User.hasMany(models.Project, { foreignKey: 'user_id'})
  }

  User.prototype.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

