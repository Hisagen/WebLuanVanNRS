import db from "../models/index";
require("dotenv").config();

let searchThuocService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let thuoc1 = await db.thuocs.findAll({
        where: { tenthuoc: data },
      });
      resolve({
        errCode: 0,
        data: thuoc1,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  searchThuocService: searchThuocService,
};
