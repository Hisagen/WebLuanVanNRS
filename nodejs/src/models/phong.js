"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class phongs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      phongs.hasMany(models.lichbacsikhams, {
        foreignKey: "id",
        as: "lichbacsikhamphong",
      });
      phongs.belongsTo(models.chuyenkhoas, {
        foreignKey: "id_chuyenkhoa",
        targetKey: "id",
        as: "phongchuyenkhoa",
      });
      phongs.belongsTo(models.tangs, {
        foreignKey: "id_tang",
        targetKey: "id",
        as: "phongtang",
      });
    }
  }
  phongs.init(
    {
      tenphong: DataTypes.STRING,
      id_chuyenkhoa: DataTypes.INTEGER,
      id_tang: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "phongs",
    }
  );
  return phongs;
};
