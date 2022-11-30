"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class giathuocs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      giathuocs.belongsTo(models.thuocs, {
        foreignKey: "id_thuoc",
        targetKey: "id",
        as: "giathuoc_thuoc",
      });
    }
  }
  giathuocs.init(
    {
      id_thuoc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ngaytao: {
        type: DataTypes.DATE,
        primaryKey: true,
      },
      gia_bhyt: DataTypes.DECIMAL(19, 6),
      gia_dichvu: DataTypes.DECIMAL(19, 6),
    },
    {
      sequelize,
      modelName: "giathuocs",
    }
  );
  return giathuocs;
};
