"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("chuyenkhoas", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      tenchuyenkhoa: {
        type: Sequelize.STRING,
      },
      slbntd: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      descriptionHTML: {
        type: Sequelize.TEXT,
      },
      descriptionMarkdown: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("chuyenkhoas");
  },
};
