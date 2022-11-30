'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('nhasxs', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            tennhasx: {
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
        await queryInterface.dropTable('nhasxs');
    }
};

