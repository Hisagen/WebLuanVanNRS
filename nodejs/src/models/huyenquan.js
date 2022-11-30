'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class huyenquans extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            huyenquans.hasMany(models.xaphuongs, { foreignKey: 'id', as: 'xaphuonghuyenquan' })
            huyenquans.belongsTo(models.tinhthanhs, { foreignKey: 'id_tinhthanh', targetKey: 'id', as: 'huyenquantinhthanh' })
        }
    };
    huyenquans.init({
        tenhuyenquan: DataTypes.STRING,
        id_tinhthanh: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'huyenquans',
    });
    return huyenquans;
};