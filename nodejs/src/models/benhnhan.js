"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class benhnhans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      benhnhans.belongsTo(models.xaphuongs, {
        foreignKey: "id_xaphuong",
        targetKey: "id",
        as: "benhnhanxaphuong",
      });
      benhnhans.hasMany(models.dangkys, {
        foreignKey: "id",
        as: "dangkybenhnhan",
      });
    }
  }
  benhnhans.init(
    {
      hoten: DataTypes.STRING,
      // nguoidamho: DataTypes.STRING,
      gioitinh: DataTypes.STRING,
      sdt: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nghenghiep: DataTypes.STRING,
      diachi: DataTypes.STRING,
      ngaysinh: DataTypes.DATE,
      id_xaphuong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "benhnhans",
    }
  );
  return benhnhans;
};
