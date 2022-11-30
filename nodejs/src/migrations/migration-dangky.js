'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('dangkys', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            id_benhnhan: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_lichkham: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id_lichbacsikham: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            trangthai: {
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
        await queryInterface.dropTable('dangkys');
    }
};

