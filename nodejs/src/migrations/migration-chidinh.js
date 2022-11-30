'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('chidinhs', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            id_thuoc: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_phieukham: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            soluong: {
                type: Sequelize.STRING
            },
            lieudung: {
                type: Sequelize.STRING
            },
            cachdung: {
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('chidinhs');
    }
};

