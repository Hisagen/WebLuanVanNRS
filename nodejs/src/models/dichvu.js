"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class dichvus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      dichvus.hasMany(models.giadichvus, {
        foreignKey: "id",
        as: "giadichvu_dichvu",
      });

      dichvus.hasMany(models.hinhanhchidinhs, {
        foreignKey: "id",
        as: "hinhanh_dichvu",
      });
    }
  }
  dichvus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tendichvu: DataTypes.STRING,
      id_loaidichvu: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "dichvus",
    }
  );
  return dichvus;
};
