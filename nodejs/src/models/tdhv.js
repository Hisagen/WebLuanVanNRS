'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tdhvs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            tdhvs.hasMany(models.vienchucs, { foreignKey: 'id', as: 'vienchuctdhv' })
        }
    };
    tdhvs.init({
        tentdhv: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'tdhvs',
    });
    return tdhvs;
};