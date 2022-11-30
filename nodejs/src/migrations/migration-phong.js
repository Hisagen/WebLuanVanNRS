'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('phongs', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            tenphong: {
                type: Sequelize.STRING
            },
            id_chuyenkhoa: {
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
        await queryInterface.dropTable('phongs');
    }
};

