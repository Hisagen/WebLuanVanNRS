'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('lichkhams', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            id_lichbacsikham: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            gio: {
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
        await queryInterface.dropTable('lichkhams');
    }
};

