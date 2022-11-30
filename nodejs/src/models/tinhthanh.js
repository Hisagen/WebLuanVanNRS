'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tinhthanhs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            tinhthanhs.hasMany(models.huyenquans, { foreignKey: 'id', as: 'huyenquantinhthanh' })
        }
    };
    tinhthanhs.init({
        tentinhthanh: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'tinhthanhs',
    });
    return tinhthanhs;
};