"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class thuocs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      thuocs.belongsTo(models.nhomthuocs, {
        foreignKey: "id_nhomthuoc",
        targetKey: "id",
        as: "thuochoatchat",
      });
      thuocs.hasMany(models.chidinhs, { foreignKey: "id", as: "chidinhthuoc" });
      thuocs.hasMany(models.temps, { foreignKey: "id", as: "tempthuoc" });

      thuocs.hasMany(models.giathuocs, {
        foreignKey: "id",
        as: "giathuoc_thuoc",
      });
    }
  }
  thuocs.init(
    {
      tenthuoc: DataTypes.STRING,
      id_nhomthuoc: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "thuocs",
    }
  );
  return thuocs;
};
