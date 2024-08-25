'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      patient_id: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING(1094)
      },
      title: {
        type: Sequelize.STRING
      },
      positive: {
        type: Sequelize.BOOLEAN
      },
      negative: {
        type: Sequelize.BOOLEAN
      },
      neutral: {
        type: Sequelize.BOOLEAN
      },
      sentiment: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notes');
  }
};