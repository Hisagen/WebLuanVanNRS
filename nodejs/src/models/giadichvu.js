"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class giadichvus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      giadichvus.belongsTo(models.dichvus, {
        foreignKey: "id_dichvu",
        targetKey: "id",
        as: "giadichvu_dichvu",
      });
    }
  }

  giadichvus.init(
    {
      id_dichvu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ngaytao: {
        type: DataTypes.DATE,
        primaryKey: true,
      },
      gia_bhyt: DataTypes.DECIMAL(19, 6),
      gia_dichvu: DataTypes.DECIMAL(19, 6),
      trangthai: DataTypes.STRING,

    },
    {
      sequelize,
      modelName: "giadichvus",
    }
  );
  return giadichvus;
};
