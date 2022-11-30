"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class donvitinhs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // donvitinhs.hasMany(models.thuocs, { foreignKey: 'id', as: 'thuochoatchat' })
    }
  }
  donvitinhs.init(
    {
      tendonvitinh: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "donvitinhs",
    }
  );
  return donvitinhs;
};
