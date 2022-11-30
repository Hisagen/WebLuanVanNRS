"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class lichkhams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      lichkhams.hasMany(models.dangkys, {
        foreignKey: "id",
        as: "dangkylichkham",
      });
      lichkhams.belongsTo(models.lichbacsikhams, {
        foreignKey: "id_lichbacsikham",
        targetKey: "id",
        as: "lichkhamlichbacsikham",
      });
    }
  }
  lichkhams.init(
    {
      id_lichbacsikham: DataTypes.INTEGER,
      khunggio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "lichkhams",
    }
  );
  return lichkhams;
};
