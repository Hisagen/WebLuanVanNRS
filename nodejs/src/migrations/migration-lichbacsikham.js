"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("lichbacsikhams", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_vienchuc: {
        type: Sequelize.INTEGER,
      },
      id_phong: {
        type: Sequelize.INTEGER,
      },
      id_buoi: {
        type: Sequelize.INTEGER,
      },
      ngay: {
        type: Sequelize.STRING,
      },
      buoi: {
        type: Sequelize.STRING,
      },
      trangthaikham: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("lichbacsikhams");
  },
};
