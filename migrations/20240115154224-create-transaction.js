'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      portfolioId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      symbol: {
        type: Sequelize.STRING(3),
        allowNull: false,
        validate: {
          isUppercase: true,
          is: /^[A-Z]{3}$/i
        }
      },
      shareRate: {
        type: Sequelize.DECIMAL(5, 2)
      },
      shareQuantity: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM("BUY", "SELL")
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
    await queryInterface.dropTable('transactions');
  }
};