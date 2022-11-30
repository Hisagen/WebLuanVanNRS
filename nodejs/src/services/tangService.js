import db from "../models/index";
require("dotenv").config();
let getAllTangService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let tangs = await db.tangs.findAll({
        attributes: ["id", "tentang"],
      });
      resolve({
        errCode: 0,
        data: tangs,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createTangService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tentang) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen chuc vu",
        });
      } else {
        await db.tangs.create({
          tentang: data.tentang,
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

let deleteTangService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundTang = await db.tangs.findOne({
      attributes: ["id", "tentang"],
      where: { id: id },
    });
    if (!foundTang) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay chuc vu`,
      });
    }
    await db.tangs.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `chuc vu da duoc xoa`,
    });
  });
};

let getTangIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chuc vu!",
        });
      } else {
        let data = await db.tangs.findOne({
          attributes: ["id", "tentang"],

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

let editTangService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id && !data.tentang) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen chuc vu",
        });
      }
      let tang = await db.tangs.findOne({
        attributes: ["id", "tentang"],

        where: { id: data.id },
        raw: false,
      });
      if (tang) {
        tang.tentang = data.tentang;
        await tang.save();

        resolve({
          errCode: 0,
          message: "cap nhat chuc vu thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "chuc vu bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllTangService: getAllTangService,
  getTangIdService: getTangIdService,
  createTangService: createTangService,
  editTangService: editTangService,
  deleteTangService: deleteTangService,
};
