"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class khunggios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      khunggios.hasMany(models.lichbacsikhams, {
        foreignKey: "id",
        as: "lichbacsikhambuoi",
      });
    }
  }
  khunggios.init(
    {
      tenkhungio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "khunggios",
    }
  );
  return khunggios;
};
