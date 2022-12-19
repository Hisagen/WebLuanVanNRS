"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chidinhs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      chidinhs.belongsTo(models.phieukhams, {
        foreignKey: "id_phieukham",
        targetKey: "id",
        as: "chidinhphieukham",
      });
      chidinhs.belongsTo(models.thuocs, {
        foreignKey: "id_thuoc",
        targetKey: "id",
        as: "chidinhthuoc",
      });
    }
  }
  chidinhs.init(
    {
      soluong: DataTypes.INTEGER,
      lieudung: DataTypes.STRING,
      cachdung: DataTypes.STRING,
      id_thuoc: DataTypes.INTEGER,
      id_phieukham: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chidinhs",
    }
  );
  return chidinhs;
};
