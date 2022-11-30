import db from "../models/index";
const { Op } = require("sequelize");
require("dotenv").config();
let getAllDichVu = (searchValue) => {
  return new Promise(async (resolve, reject) => {
    let dichvu = await db.giadichvus.findAll({
      where: { trangthai: "Giá hiện tại" },
      attributes: ["id_dichvu", "ngaytao", "gia_bhyt", "gia_dichvu"],
      include: [{ model: db.dichvus, as: "giadichvu_dichvu" }],
    });
    console.log("==================> dichvu", dichvu)
    let array = [];
    if (dichvu && dichvu.length > 0) {
      for (let i = 0; i < dichvu.length; i++) {
        let obj = {};
        (obj.id = dichvu[i].id),
          (obj.gia_bhyt = dichvu[i]?.gia_bhyt),
          (obj.gia_dichvu = dichvu[i]?.gia_dichvu),
          (obj.tendichvu = dichvu[i]?.giadichvu_dichvu?.tendichvu);
        array.push(obj);
      }
    }

    resolve({
      data: array,
      errCode: 0,
    });
  });
};
module.exports = { getAllDichVu: getAllDichVu };
