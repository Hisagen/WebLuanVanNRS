"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vienchucs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hoten: {
        type: Sequelize.STRING,
      },
      gioitinh: {
        type: Sequelize.STRING,
      },
      diachi: {
        type: Sequelize.STRING,
      },
      sdt: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      contentHTML: {
        type: Sequelize.TEXT,
      },
      contentMarkdown: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      id_xaphuong: {
        type: Sequelize.INTEGER,
      },
      id_chuyenkhoa: {
        type: Sequelize.INTEGER,
      },
      id_tdhv: {
        type: Sequelize.INTEGER,
      },
      id_chucvu: {
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
    await queryInterface.dropTable("vienchucs");
  },
};
