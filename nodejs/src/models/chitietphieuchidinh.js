"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chitietphieuchidinhs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   chitietphieuchidinhs.belongsTo(models.phieukhams, {
      //     foreignKey: "id_phieukham",
      //     targetKey: "id",
      //     as: "chidinhphieukham",
      //   });
      chitietphieuchidinhs.belongsTo(models.phieuchidinhs, {
        foreignKey: "id_phieuchidinh",
        targetKey: "id",
        as: "chitietPCD_chidinh",
      });
    }
  }
  chitietphieuchidinhs.init(
    {
      id_phieuchidinh: DataTypes.INTEGER,
      id_dichvu: DataTypes.INTEGER,
      trangthaikham: DataTypes.STRING,
      gia: DataTypes.DECIMAL(19, 6),
      ketqua: DataTypes.STRING,
      loidan: DataTypes.STRING,
      ghichu: DataTypes.STRING,
      ketluan: DataTypes.STRING,
      id_vienchucthuchien: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chitietphieuchidinhs",
    }
  );
  return chitietphieuchidinhs;
};
