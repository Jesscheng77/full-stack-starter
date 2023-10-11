'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bobas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Restaurants: {
        type: Sequelize.STRING,
      },
      Address: {
        type: Sequelize.STRING,
      },
      Number: {
        type: Sequelize.STRING,
      },
      Rating: {
        type: Sequelize.INTEGER,
      },
      Hours: {
        type: Sequelize.STRING,
      },
      Image: {
        type: Sequelize.STRING,
      },
      Feedback: {
        type: Sequelize.TEXT,
      },
      City: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bobas');
  },
};
