'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class temps extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            temps.belongsTo(models.thuocs, { foreignKey: 'id_thuoc', targetKey: 'id', as: 'tempthuoc' })
        }
    };
    temps.init({
        soluong: DataTypes.INTEGER,
        lieudung: DataTypes.STRING,
        cachdung: DataTypes.STRING,
        id_thuoc: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'temps',
    });
    return temps;
};