"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dangkys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dangkys.hasOne(models.phieukhams, {
        foreignKey: "id",
        as: "phieukhamdangky",
      });
      dangkys.belongsTo(models.benhnhans, {
        foreignKey: "id_benhnhan",
        targetKey: "id",
        as: "dangkybenhnhan",
      });
      dangkys.belongsTo(models.lichkhams, {
        foreignKey: "id_lichkham",
        targetKey: "id",
        as: "dangkylichkham",
      });
      dangkys.belongsTo(models.lichbacsikhams, {
        foreignKey: "id_lichbacsikham",
        targetKey: "id",
        as: "dangkylichbacsikham",
      });
      dangkys.belongsTo(models.phuongthucthanhtoans, {
        foreignKey: "id_pttt",
        targetKey: "id",
        as: "phuongthucdangky",
      });
    }
  }
  dangkys.init(
    {
      id_lichkham: DataTypes.INTEGER,
      id_lichbacsikham: DataTypes.INTEGER,
      id_benhnhan: DataTypes.INTEGER,
      trangthaikham: DataTypes.STRING,
      trangthaithanhtoan: DataTypes.STRING,
      id_pttt: DataTypes.INTEGER,
      giakham: DataTypes.DECIMAL(19, 6),
      trieuchung: DataTypes.STRING,
      taikham: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "dangkys",
    }
  );
  return dangkys;
};
