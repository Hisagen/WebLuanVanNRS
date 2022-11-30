import db from "../models/index";
require("dotenv").config();

let getAllGiadichvu = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.giadichvus.findAll({
        attributes: ["id_dichvu", "ngaytao", "gia_bhyt", "gia_dichvu"],
        include: [
          {
            model: db.dichvus,
            as: "giadichvu_dichvu",
            attributes: ["id", "tendichvu", "id_loaidichvu"],
          },
        ],
        raw: false,
        nest: true,
      });

      if (res) {
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllGiadichvu: getAllGiadichvu,
};
