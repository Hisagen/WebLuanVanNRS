import db from "../models/index";
require("dotenv").config();
let getAllChucvuService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let chucvus = await db.chucvus.findAll();
      resolve({
        errCode: 0,
        data: chucvus,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createChucvuService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tenchucvu) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen chuc vu",
        });
      } else {
        await db.chucvus.create({
          // id: data.id,
          tenchucvu: data.tenchucvu,
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

let deleteChucvuService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundChucvu = await db.chucvus.findOne({
      where: { id: id },
    });
    if (!foundChucvu) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay chuc vu`,
      });
    }
    await db.chucvus.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `chuc vu da duoc xoa`,
    });
  });
};

let getChucvuIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chuc vu!",
        });
      } else {
        let data = await db.chucvus.findOne({
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

let editChucvuService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id && !data.tenchucvu) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen chuc vu",
        });
      }
      let chucvu = await db.chucvus.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (chucvu) {
        chucvu.tenchucvu = data.tenchucvu;
        await chucvu.save();

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
  getAllChucvuService: getAllChucvuService,
  getChucvuIdService: getChucvuIdService,
  createChucvuService: createChucvuService,
  editChucvuService: editChucvuService,
  deleteChucvuService: deleteChucvuService,
};
