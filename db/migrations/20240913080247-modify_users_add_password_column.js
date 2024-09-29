'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'password', { type: Sequelize.STRING, allowNull: false });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'password');
  }
};
