'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Notes', [
      {
        patient_id: 1,
        date: "2023-06-21 00:00:00+00:00",
        description: "Hoje trabalhei o dia todo, e depois do trabalho fui até o bar e bebi até cair de bêbado",
        title: "Dia cansativo",
        positive: 0,
        negative: 1,
        neutral: 16,
        sentiment: "negative",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        patient_id: 1,
        date: "2023-06-22 00:00:00+00:00",
        description: "Hoje foi mais um dia indiferente na vida, só trabalhei, comi e me mantive vivo. Não faz mais sentido!",
        title: "Dia normal",
        positive: 1,
        negative: 2,
        neutral: 14,
        sentiment: "negative",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        patient_id: 1,
        date: "2023-06-23 00:00:00+00:00",
        description: "Hoje consegui tirar um dia de folga para ficar com a minha família, fazia algum tempo que não me sentia tão bem com a vida.",
        title: "Dia bom",
        positive: 1,
        negative: 0,
        neutral: 22,
        sentiment: "positive",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        patient_id: 1,
        date: "2023-06-24 00:00:00+00:00",
        description: "Hoje pela manhã, acordei, tomei café da manhã, depois tomei um banho e comecei a trabalhar, ao meio dia fui almoçar em um restaurante perto de casa, com minha família, foi bom ter um momento juntos, pois não tínhamos a tempos. Depois do almoço voltei a trabalhar até o fim da tarde e esse foi meu dia.",
        title: "Almoço em família",
        positive: 1,
        negative: 0,
        neutral: 55,
        sentiment: "positive",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
  }
};
