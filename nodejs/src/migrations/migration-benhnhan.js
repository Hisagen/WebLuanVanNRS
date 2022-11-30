'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('benhnhans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hoten: {
        type: Sequelize.STRING
      },
      ngaysinh: {
        type: Sequelize.STRING
      },
      gioitinh: {
        type: Sequelize.STRING
      },
      sdt: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      nghenghiep: {
        type: Sequelize.STRING
      },
      diachi: {
        type: Sequelize.STRING
      },
      cccd: {
        type: Sequelize.STRING
      },
      id_xaphuong: {
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('benhnhans');
  }
};

