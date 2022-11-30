import db from "../models/index";
require("dotenv").config();
var Sequelize = require("sequelize");

let getAllGiaKhamService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let giakham = await db.giakhams.findAll({
        attributes: ["id_chuyenkhoa", "ngaytao", "gia_bhyt", "gia_dichvu"],
        include: [
          {
            model: db.chuyenkhoas,
            as: "giakham_chuyenkhoa",
            attributes: ["id", "tenchuyenkhoa"],
          },
        ],
        raw: false,
        nest: true,
      });

      // let giakham = Sequelize.query("SELECT * FROM `giakhams`");
      resolve({
        errCode: 0,
        data: giakham,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllGiaKhamService: getAllGiaKhamService,
};
