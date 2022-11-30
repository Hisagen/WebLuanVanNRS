"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class loaidichvus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // loaidichvus.hasMany(models.thuocs, { foreignKey: 'id', as: 'thuochoatchat' })
    }
  }
  loaidichvus.init(
    {
      tenloaidichvu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "loaidichvus",
    }
  );
  return loaidichvus;
};
