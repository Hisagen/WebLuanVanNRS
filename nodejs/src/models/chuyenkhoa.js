"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chuyenkhoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      chuyenkhoas.hasMany(models.vienchucs, {
        foreignKey: "id",
        as: "vienchucchuyenkhoa",
      });
      chuyenkhoas.hasMany(models.phongs, {
        foreignKey: "id",
        as: "phongchuyenkhoa",
      });
      chuyenkhoas.hasMany(models.giakhams, {
        foreignKey: "id",
        as: "giakham_chuyenkhoa",
      });
    }
  }
  chuyenkhoas.init(
    {
      tenchuyenkhoa: DataTypes.STRING,
      slbntd: DataTypes.INTEGER,
      imagePath: DataTypes.TEXT,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      imageName: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "chuyenkhoas",
    }
  );
  return chuyenkhoas;
};
