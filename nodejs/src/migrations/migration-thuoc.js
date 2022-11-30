"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("thuocs", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      tenthuoc: {
        type: Sequelize.STRING,
      },
      dvt: {
        type: Sequelize.STRING,
      },
      id_nhomthuoc: {
        type: Sequelize.INTEGER,
      },
      id_nhasx: {
        type: Sequelize.INTEGER,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("thuocs");
  },
};
