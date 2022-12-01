"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class phieuchidinhs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      phieuchidinhs.belongsTo(models.phieukhams, {
        foreignKey: "id_phieukham",
        targetKey: "id",
        as: "phieuchidinhphieukham",
      });

      phieuchidinhs.hasMany(models.hinhanhchidinhs, {
        foreignKey: "id",
        as: "hinhanhpcd_phieuchidinh",
      });
    }
  }
  phieuchidinhs.init(
    {
      trangthaithanhtoan: DataTypes.STRING,
      id_phieukham: DataTypes.INTEGER,
      chuandoan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "phieuchidinhs",
    }
  );
  return phieuchidinhs;
};
