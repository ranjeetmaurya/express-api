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
    },
    c_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }

  }, {
    hooks: {
      beforeValidate: (project) => {
        project.created_at = project.created_at ?? new Date();
        project.updated_at = new Date();
      }
    }
  });
  Project.associate = function (models) {
    Project.belongsTo(models.User, { foreignKey: 'user_id'})
  }  
  return Project;
};