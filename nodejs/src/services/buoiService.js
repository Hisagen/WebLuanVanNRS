import db from "../models/index";
require("dotenv").config();

let getAllBuoiService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let buois = await db.buois.findAll({
        attributes: ["id", "tenbuoi", "giobatdau", "gioketthuc"],
      });
      resolve({
        errCode: 0,
        data: buois,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createBuoiService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tenkhungio) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen buoi",
        });
      } else {
        await db.buois.create({
          tenkhungio: data.tenkhungio,
        });
      }
      resolve({
        errCode: 0,
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBuoiService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundTinhthanh = await db.buois.findOne({
      where: { id: id },
    });
    if (!foundTinhthanh) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay buoi`,
      });
    }
    await db.buois.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `buoi da duoc xoa`,
    });
  });
};

let getBuoiIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen buoi!",
        });
      } else {
        let data = await db.buois.findAll({
          attributes: ["id", "tenbuoi", "giobatdau", "gioketthuc"],
          where: {
            id: id,
          },
          raw: false,
          nest: true,
        });
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editBuoiService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id && !data.tenkhungio) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen buoi",
        });
      }
      let tinhthanh = await db.buois.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (tinhthanh) {
        tinhthanh.tenkhungio = data.tenkhungio;
        await tinhthanh.save();

        resolve({
          errCode: 0,
          message: "cap nhat buoi thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "buoi bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllBuoiService: getAllBuoiService,
  getBuoiIdService: getBuoiIdService,
  createBuoiService: createBuoiService,
  editBuoiService: editBuoiService,
  deleteBuoiService: deleteBuoiService,
};
