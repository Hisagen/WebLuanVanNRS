'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class xaphuongs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            xaphuongs.hasMany(models.benhnhans, { foreignKey: 'id', as: 'benhnhanxaphuong' })
            xaphuongs.hasMany(models.vienchucs, { foreignKey: 'id', as: 'vienchucxaphuong' })
            xaphuongs.belongsTo(models.huyenquans, { foreignKey: 'id_huyenquan', targetKey: 'id', as: 'xaphuonghuyenquan' })
        }
    };
    xaphuongs.init({
        tenxaphuong: DataTypes.STRING,
        id_huyenquan: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'xaphuongs',
    });
    return xaphuongs;
};