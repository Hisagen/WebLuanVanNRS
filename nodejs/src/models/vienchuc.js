"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vienchucs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      vienchucs.belongsTo(models.tdhvs, {
        foreignKey: "id_tdhv",
        targetKey: "id",
        as: "vienchuctdhv",
      });
      vienchucs.hasMany(models.lichbacsikhams, {
        foreignKey: "id",
        as: "lichbacsikhamvienchuc",
      });
      vienchucs.belongsTo(models.chuyenkhoas, {
        foreignKey: "id_chuyenkhoa",
        targetKey: "id",
        as: "vienchucchuyenkhoa",
      });
      vienchucs.belongsTo(models.xaphuongs, {
        foreignKey: "id_xaphuong",
        targetKey: "id",
        as: "vienchucxaphuong",
      });
      vienchucs.belongsTo(models.chucvus, {
        foreignKey: "id_chucvu",
        targetKey: "id",
        as: "vienchucchucvu",
      });
    }
  }
  vienchucs.init(
    {
      hoten: DataTypes.STRING,
      gioitinh: DataTypes.STRING,
      diachi: DataTypes.STRING,
      sdt: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      id_chuyenkhoa: DataTypes.INTEGER,
      id_xaphuong: DataTypes.INTEGER,
      id_tdhv: DataTypes.INTEGER,
      id_chucvu: DataTypes.INTEGER,
      imagePath: DataTypes.TEXT,
      contentHTML: DataTypes.TEXT,
      contentMarkdown: DataTypes.TEXT,
      description: DataTypes.TEXT,
      imageName: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "vienchucs",
    }
  );
  return vienchucs;
};
