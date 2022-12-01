"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class phieukhams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      phieukhams.hasMany(models.chidinhs, {
        foreignKey: "id",
        as: "chidinhphieukham",
      });
      phieukhams.belongsTo(models.dangkys, {
        foreignKey: "id_dangky",
        targetKey: "id",
        as: "phieukhamdangky",
      });
      phieukhams.hasMany(models.phieuchidinhs, {
        foreignKey: "id",
        as: "phieuchidinhphieukham",
      });
    }
  }
  phieukhams.init(
    {
      id_dangky: DataTypes.INTEGER,
      mabaohiemyte: DataTypes.STRING,
      trangthai: DataTypes.STRING,
      id_NhanVienTiepNhan: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "phieukhams",
    }
  );
  return phieukhams;
};
