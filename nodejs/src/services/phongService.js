import db from "../models/index";
require("dotenv").config();
let getAllPhongService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let phongs = await db.phongs.findAll({
        include: [
          { model: db.chuyenkhoas, as: "phongchuyenkhoa" },
          { model: db.tangs, as: "phongtang" },
        ],

        raw: false,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: phongs,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createPhongService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tenphong || !data.id_chuyenkhoa) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen phong",
        });
      } else {
        await db.phongs.create({
          tenphong: data.tenphong,
          id_chuyenkhoa: data.id_chuyenkhoa,
          id_tang: data.id_tang,
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

let deletePhongService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundPhong = await db.phongs.findOne({
      where: { id: id },
    });
    if (!foundPhong) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay phong`,
      });
    }
    await db.phongs.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `phong da duoc xoa`,
    });
  });
};

let getPhongIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen phong!",
        });
      } else {
        let data = await db.phongs.findOne({
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
let editPhongService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen phong",
        });
      }
      let phong = await db.phongs.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (phong) {
        phong.tenphong = data.tenphong;
        (phong.id_tang = data.id_tang),
          (phong.id_chuyenkhoa = data.id_chuyenkhoa),
          await phong.save();

        resolve({
          errCode: 0,
          message: "cap nhat phong thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "phong bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getPhongChuyenkhoaIdService = (value) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!value.id_chuyenkhoa) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chuyen khoa!",
        });
      } else {
        if (value.date_choose === "") {
          let data = await db.phongs.findAll({
            where: {
              id_chuyenkhoa: value.id_chuyenkhoa,
            },
            raw: false,
            nest: true,
          });
          if (!data) data = {};
          resolve({
            errCode: 0,
            data: data,
          });
        } else {
          let isDate = await db.lichbacsikhams.findAll({
            where: {
              ngay: value.date_choose,
            },
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllPhongService: getAllPhongService,
  getPhongIdService: getPhongIdService,
  createPhongService: createPhongService,
  editPhongService: editPhongService,
  deletePhongService: deletePhongService,
  getPhongChuyenkhoaIdService: getPhongChuyenkhoaIdService,
};
