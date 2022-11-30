"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class buois extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      buois.hasMany(models.lichbacsikhams, {
        foreignKey: "id",
        as: "lichbacsikhambuoi",
      });
    }
  }
  buois.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      tenbuoi: DataTypes.STRING,
      giobatdau: DataTypes.STRING,
      gioketthuc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "buois",
    }
  );
  return buois;
};
