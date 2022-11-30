import db from "../models/index";
require("dotenv").config();

let getAllTempService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let temps = await db.temps.findAll({
        include: [{ model: db.thuocs, as: "tempthuoc" }],
        raw: false,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: temps,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createTempService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id_thuoc || !data.soluong || !data.lieudung || !data.cachdung) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen temp",
        });
      } else {
        let lichkham1 = await db.temps.create({
          id_thuoc: data.id_thuoc,
          soluong: data.soluong,
          lieudung: data.lieudung,
          cachdung: data.cachdung,
          id_nguoidung: data.id_nguoidung,
        });
        resolve({
          errCode: 0,
          message: "ok",
          data: lichkham1,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTempService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundLichkham = await db.temps.findOne({
      where: { id: id },
    });
    if (!foundLichkham) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay temp`,
      });
    }
    await db.temps.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `temp da duoc xoa`,
    });
  });
};

let getTempIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen temp!",
        });
      } else {
        let data = await db.temps.findOne({
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

let editTempService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen temp",
        });
      }
      let temp = await db.temps.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (temp) {
        (temp.id_thuoc = data.id_thuoc),
          (temp.id_phieukham = data.id_phieukham),
          (temp.soluong = data.soluong),
          (temp.lieudung = data.lieudung),
          (temp.cachdung = data.cachdung),
          await temp.save();

        resolve({
          errCode: 0,
          message: "cap nhat temp thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "temp bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllTempService: getAllTempService,
  createTempService: createTempService,
  deleteTempService: deleteTempService,
  getTempIdService: getTempIdService,
  editTempService: editTempService,
};
