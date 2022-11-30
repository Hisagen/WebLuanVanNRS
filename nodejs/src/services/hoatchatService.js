import db from "../models/index";
require("dotenv").config();
let getAllHoatchatService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let nhomthuocs = await db.nhomthuocs.findAll();
      resolve({
        errCode: 0,
        data: nhomthuocs,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createHoatchatService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tenloaithuoc) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen hoat chat",
        });
      } else {
        await db.nhomthuocs.create({
          tenloaithuoc: data.tenloaithuoc,
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

let deleteHoatchatService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundHoatchat = await db.nhomthuocs.findOne({
      where: { id: id },
    });
    if (!foundHoatchat) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay hoatchat`,
      });
    }
    await db.nhomthuocs.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `hoatchat da duoc xoa`,
    });
  });
};

let getHoatchatIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chuc vu!",
        });
      } else {
        let data = await db.nhomthuocs.findOne({
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

let editHoatchatService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id && !data.tenloaithuoc) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen hoat chat",
        });
      }
      let hoatchat = await db.nhomthuocs.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (hoatchat) {
        hoatchat.tenloaithuoc = data.tenloaithuoc;
        await hoatchat.save();

        resolve({
          errCode: 0,
          message: "cap nhat hoat chat thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "hoat chat bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllHoatchatService: getAllHoatchatService,
  getHoatchatIdService: getHoatchatIdService,
  createHoatchatService: createHoatchatService,
  editHoatchatService: editHoatchatService,
  deleteHoatchatService: deleteHoatchatService,
};
