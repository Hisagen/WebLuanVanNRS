"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hinhanhchidinhs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // hinhanhchidinhs.hasMany(models.chidinhs, {
      //   foreignKey: "id",
      //   as: "chidinhphieukham",
      // });
      hinhanhchidinhs.belongsTo(models.phieuchidinhs, {
        foreignKey: "id_phieuchidinh",
        targetKey: "id",
        as: "hinhanhpcd_phieuchidinh",
      });

      hinhanhchidinhs.belongsTo(models.dichvus, {
        foreignKey: "id_DichVu",
        targetKey: "id",
        as: "hinhanh_dichvu",
      });
    }
  }
  hinhanhchidinhs.init(
    {
      imagePath: DataTypes.STRING,
      imageName: DataTypes.INTEGER,
      ghichu: DataTypes.STRING,
      id_phieuchidinh: DataTypes.INTEGER,
      id_DichVu: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "hinhanhchidinhs",
    }
  );
  return hinhanhchidinhs;
};
