'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('projects', 'created_at', { type: Sequelize.DATE, allowNull: false });
    queryInterface.addColumn('projects', 'updated_at', { type: Sequelize.DATE, allowNull: false });
    queryInterface.addColumn('projects', 'c_date', { type: Sequelize.DATE, allowNull: false });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('projects', 'created_at');
    queryInterface.removeColumn('projects', 'updated_at');
    queryInterface.removeColumn('projects', 'c_date');
  }
};

