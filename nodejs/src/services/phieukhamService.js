import db from "../models/index";
require("dotenv").config();

let getAllPhieukhamService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let phieukhams = await db.phieukhams.findAll();
      resolve({
        errCode: 0,
        data: phieukhams,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createPhieukhamService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.chuandoan || !data.id_dangky) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen phieukham",
        });
      } else {
        let lichkham1 = await db.phieukhams.create({
          chuandoan: data.chuandoan,
          loidan: data.loidan,
          ghichu: data.ghichu,
          id_dangky: data.id_dangky,
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

let deleteLichkhamService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundLichkham = await db.phieukhams.findOne({
      where: { id: id },
    });
    if (!foundLichkham) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay phieukham`,
      });
    }
    await db.phieukhams.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `phieukham da duoc xoa`,
    });
  });
};

let getPhieukhamIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen phieukham!",
        });
      } else {
        let data = await db.phieukhams.findOne({
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

let editPhieukhamService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen phieukham",
        });
      }
      let phieukham = await db.phieukhams.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (phieukham) {
        (phieukham.chuandoan = data.chuandoan),
          (phieukham.loidan = data.loidan),
          (phieukham.ghichu = data.ghichu),
          (phieukham.id_dangky = data.id_dangky),
          await phieukham.save();

        resolve({
          errCode: 0,
          message: "cap nhat phieukham thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "phieukham bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBenhNhanPhieukhamIdService = (id_benhnhan) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_benhnhan) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen phieukham!",
        });
      } else {
        let data = await db.phieukhams.findAll({
          include: [
            {
              model: db.dangkys,
              as: "phieukhamdangky",
              where: { id_benhnhan: id_benhnhan },
            },
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

let getBenhNhanPhieukhamIdService1 = (id_benhnhan) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_benhnhan) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen phieukham!",
        });
      } else {
        let data = await db.phieukhams.findAOne({
          include: [
            {
              model: db.dangkys,
              as: "phieukhamdangky",
              where: { id_benhnhan: id_benhnhan },
            },
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

module.exports = {
  getAllPhieukhamService: getAllPhieukhamService,
  createPhieukhamService: createPhieukhamService,
  deleteLichkhamService: deleteLichkhamService,
  getPhieukhamIdService: getPhieukhamIdService,
  editPhieukhamService: editPhieukhamService,
  getBenhNhanPhieukhamIdService: getBenhNhanPhieukhamIdService,
  getBenhNhanPhieukhamIdService1: getBenhNhanPhieukhamIdService1,
};
