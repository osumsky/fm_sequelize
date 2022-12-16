'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users_to_groups',
      'created_at',
      Sequelize.DATE,
      {
        allowNull: false,
      }
    );
    await queryInterface.addColumn(
      'users_to_groups',
      'updated_at',
      Sequelize.DATE,
      {
        allowNull: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users_to_groups', 'created_at');
    await queryInterface.removeColumn('users_to_groups', 'updated_at');
  },
};
