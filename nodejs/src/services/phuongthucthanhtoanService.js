import db from "../models/index";
require("dotenv").config();
var Sequelize = require("sequelize");

let getAllPhuongthucthanhtoanService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let giakham = await db.phuongthucthanhtoans.findAll({
        attributes: ["id", "tenphuongthucthanhtoan"],
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
  getAllPhuongthucthanhtoanService: getAllPhuongthucthanhtoanService,
};
