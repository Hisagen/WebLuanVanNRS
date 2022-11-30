'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class nhasxs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            nhasxs.hasMany(models.thuocs, { foreignKey: 'id', as: 'thuocnhasx' })
        }
    };
    nhasxs.init({
        tennhasx: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'nhasxs',
    });
    return nhasxs;
};