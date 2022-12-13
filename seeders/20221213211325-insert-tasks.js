'use strict';
const _ = require('lodash');

const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await sequelize.query('SELECT * FROM "users" ', {
      type: QueryTypes.SELECT,
    });
    console.log('start');
    const tasks = users
      .map((u) =>
        new Array(_.random(3, 7, false)).fill(null).map((t, i) => ({
          body: `text_task_${i}`,
          user_id: u.id,
          created_at: new Date(),
          updated_at: new Date(),
        }))
      )
      .flat(1);

    await queryInterface.bulkInsert('tasks', tasks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
