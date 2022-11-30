import db from "../models/index";
require("dotenv").config();
var Sequelize = require("sequelize");

let getAllGiaThuocService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let giathuoc = await db.giathuocs.findAll({
        attributes: ["id_thuoc", "ngaytao", "gia_bhyt", "gia_dichvu"],
        include: [
          {
            model: db.thuocs,
            as: "giathuoc_thuoc",
            attributes: ["id", "tenthuoc", "id_nhomthuoc"],
          },
        ],
        raw: false,
        nest: true,
      });

      // let giathuoc = Sequelize.query("SELECT * FROM `giathuocs`");
      resolve({
        errCode: 0,
        data: giathuoc,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllGiaThuocService: getAllGiaThuocService,
};
