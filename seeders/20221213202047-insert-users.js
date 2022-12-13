'use strict';

const generateUser = (key) => ({
  first_name: `Elon${key}`,
  last_name: `Mask${key}`,
  email: `elon${key}@gmail.com`,
  password_hash: 'password',
  birthday: new Date(1950, 0, key * 10),
  is_male: Math.random() > 0.5,
  created_at: new Date(),
  updated_at: new Date(),
});

const generateUsers = (amount = 50) =>
  new Array(amount).fill(null).map((u, i) => generateUser(i));

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', generateUsers(70), {});
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  },
};
