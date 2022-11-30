import db from "../models/index";
require("dotenv").config();

let getAllThuocService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let thuoc1 = await db.thuocs.findAll({
        include: [
          { model: db.nhomthuocs, as: "thuochoatchat" },
          // { model: db.nhasxs, as: "thuocnhasx" },
        ],
        raw: false,
        nest: true,
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

let createThuocService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tenthuoc || !data.id_nhomthuoc) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen thuoc",
        });
      } else {
        await db.thuocs.create({
          tenthuoc: data.tenthuoc,
          // dvt: data.dvt,
          id_nhomthuoc: data.id_nhomthuoc,
          // id_nhasx: data.id_nhasx,
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

let deleteThuocService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundTinhthanh = await db.thuocs.findOne({
      where: { id: id },
    });
    if (!foundTinhthanh) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay thuoc`,
      });
    }
    await db.thuocs.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `thuoc da duoc xoa`,
    });
  });
};

let getThuocIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen thuoc!",
        });
      } else {
        let data = await db.thuocs.findOne({
          where: {
            id: id,
          },
          include: [
            { model: db.nhasxs, as: "thuocnhasx" },
            { model: db.nhomthuocs, as: "thuochoatchat" },
          ],
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

let editThuocService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen thuoc",
        });
      }
      let thuoc = await db.thuocs.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (thuoc) {
        (thuoc.tenthuoc = data.tenthuoc),
          (thuoc.dvt = data.dvt),
          (thuoc.id_nhomthuoc = data.id_nhomthuoc),
          // (thuoc.id_nhasx = data.id_nhasx),
          await thuoc.save();

        resolve({
          errCode: 0,
          message: "cap nhat thuoc thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "thuoc bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllThuocService: getAllThuocService,
  getThuocIdService: getThuocIdService,
  createThuocService: createThuocService,
  editThuocService: editThuocService,
  deleteThuocService: deleteThuocService,
};
