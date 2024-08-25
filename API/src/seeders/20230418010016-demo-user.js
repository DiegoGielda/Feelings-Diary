'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        completeName: 'Diego Gielda',
        email: 'diego@hotmail.com',
        password: '$2b$10$nOo.utPUk5uPC0L4GKrJXOI1Cw9sgpQKKxQARxm31YJXSms2xFLW6',
        isProfessional: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        completeName: 'Jaisson Bassanesi',
        email: 'jaisson@bassanesi.com',
        password: '$2b$10$DYfI9JhEdhZxFXpmq5CBVOn1SMZn9bEwE8xCZIg/yYQvz.vThX03u',
        isProfessional: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        completeName: 'Daniel Sousa',
        email: 'dan@tic.com',
        password: '$2b$10$DYfI9JhEdhZxFXpmq5CBVOn1SMZn9bEwE8xCZIg/yYQvz.vThX03u',
        isProfessional: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        completeName: 'Tanguy Baghdadi',
        email: 'tan@tic.com',
        password: '$2b$10$DYfI9JhEdhZxFXpmq5CBVOn1SMZn9bEwE8xCZIg/yYQvz.vThX03u',
        isProfessional: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        completeName: 'Yevgeny Prigozhin',
        email: 'yev@tic.com',
        password: '$2b$10$DYfI9JhEdhZxFXpmq5CBVOn1SMZn9bEwE8xCZIg/yYQvz.vThX03u',
        isProfessional: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        completeName: 'Vladmir Putin',
        email: 'vla@tic.com',
        password: '$2b$10$DYfI9JhEdhZxFXpmq5CBVOn1SMZn9bEwE8xCZIg/yYQvz.vThX03u',
        isProfessional: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
