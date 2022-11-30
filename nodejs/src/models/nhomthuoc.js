"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nhomthuocs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      nhomthuocs.hasMany(models.thuocs, {
        foreignKey: "id",
        as: "thuochoatchat",
      });
    }
  }
  nhomthuocs.init(
    {
      tennhomthuoc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "nhomthuocs",
    }
  );
  return nhomthuocs;
};
