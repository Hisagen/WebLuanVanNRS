"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class lichbacsikhams extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      lichbacsikhams.belongsTo(models.phongs, {
        foreignKey: "id_phong",
        targetKey: "id",
        as: "lichbacsikhamphong",
      });
      lichbacsikhams.belongsTo(models.vienchucs, {
        foreignKey: "id_vienchuc",
        targetKey: "id",
        as: "lichbacsikhamvienchuc",
      });
      lichbacsikhams.hasMany(models.lichkhams, {
        foreignKey: "id",
        as: "lichkhamlichbacsikham",
      });
      lichbacsikhams.belongsTo(models.buois, {
        foreignKey: "id_buoi",
        targetKey: "id",
        as: "lichbacsikhambuoi",
      });
    }
  }
  lichbacsikhams.init(
    {
      id_vienchuc: DataTypes.INTEGER,
      id_buoi: DataTypes.INTEGER,
      id_phong: DataTypes.INTEGER,
      id_chuyenkhoa: DataTypes.INTEGER,
      ngay: DataTypes.DATE,
      ghichu: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "lichbacsikhams",
    }
  );
  return lichbacsikhams;
};
