'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fname: {
        field: 'first_name',
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      lname: {
        field: 'last_name',
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        field: 'password_hash',
        allowNull: false,
        type: Sequelize.TEXT,
      },
      birthday: {
        type: Sequelize.DATEONLY,
      },
      isMale: {
        field: 'is_male',
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};