'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Professionals', [
      {
        user_id: 1,
        tag: '1234567',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        tag: '68973',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Professionals', null, {});
  }
};
