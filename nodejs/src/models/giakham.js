"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class giakhams extends Model {
    static associate(models) {
      giakhams.belongsTo(models.chuyenkhoas, {
        foreignKey: "id_chuyenkhoa",
        targetKey: "id",
        as: "giakham_chuyenkhoa",
      });
    }
  }
  giakhams.init(
    {
      id_chuyenkhoa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ngaytao: {
        type: DataTypes.DATE,
        primaryKey: true,
      },

      // id_chuyenkhoa: DataTypes.INTEGER,
      // ngaytao: DataTypes.DATE,
      gia_bhyt: DataTypes.DECIMAL(19, 6),
      gia_dichvu: DataTypes.DECIMAL(19, 6),
    },
    {
      sequelize,
      modelName: "giakhams",
      tableName: "giakhams",
      removeAttr: "id",
      timestamps: false,
    }
  );
  giakhams.removeAttribute("id");
  return giakhams;
};
