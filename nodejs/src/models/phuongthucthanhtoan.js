"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class phuongthucthanhtoans extends Model {
    static associate(models) {
      phuongthucthanhtoans.hasMany(models.dangkys, {
        foreignKey: "id",
        as: "phuongthucdangky",
      });
    }
  }
  phuongthucthanhtoans.init(
    {
      tenphuongthucthanhtoan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "phuongthucthanhtoans",
      timestamps: false,
    }
  );
  return phuongthucthanhtoans;
};
