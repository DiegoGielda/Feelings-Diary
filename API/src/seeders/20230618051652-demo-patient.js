'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Patients', [
      {
        user_id: 2,
        professionalTag: '68973',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        professionalTag: '68973',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 5,
        professionalTag: '68973',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 6,
        professionalTag: '68973',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Patients', null, {});
  }
};
