"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chucvus extends Model {
    static associate(models) {
      chucvus.hasMany(models.vienchucs, {
        foreignKey: "id",
        as: "vienchucchucvu",
      });
    }
  }
  chucvus.init(
    {
      tenchucvu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "chucvus",
    }
  );
  return chucvus;
};
