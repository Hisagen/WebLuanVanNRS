"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tangs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tangs.hasMany(models.phongs, {
        foreignKey: "id",
        as: "phongtang",
      });
    }
  }
  tangs.init(
    {
      tentang: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tangs",
    }
  );
  return tangs;
};
