import db from "../models/index";
require("dotenv").config();
let getAllChuyenkhoaService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let chuyenkhoas = await db.chuyenkhoas.findAll();
      resolve({
        errCode: 0,
        data: chuyenkhoas,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createChuyenkhoaService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tenchuyenkhoa || !data.slbntd) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen chuyenkhoa",
        });
      } else {
        await db.chuyenkhoas.create({
          tenchuyenkhoa: data.tenchuyenkhoa,
          slbntd: data.slbntd,
          imagePath: data.filePath,
          imageName: data.fileName,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
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

let deleteChuyenkhoaService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundChuyenkhoa = await db.chuyenkhoas.findOne({
      where: { id: id },
    });
    if (!foundChuyenkhoa) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay chuyenkhoa`,
      });
    } else {
      if (foundChuyenkhoa.imagePath !== null) {
        var fs = require("fs");
        fs.unlinkSync(foundChuyenkhoa.imagePath);
      }
      await db.chuyenkhoas.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        errMessage: `chuyenkhoa da duoc xoa`,
      });
    }
  });
};

let getChuyenkhoaIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chuyenkhoa!",
        });
      } else {
        let data = await db.chuyenkhoas.findOne({
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

let editChuyenkhoaService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen chuyenkhoa",
        });
      }
      let chuyenkhoa = await db.chuyenkhoas.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (chuyenkhoa) {
        chuyenkhoa.tenchuyenkhoa = data.tenchuyenkhoa;
        (chuyenkhoa.slbntd = data.slbntd),
          (chuyenkhoa.image = data.avatar),
          (chuyenkhoa.descriptionHTML = data.descriptionHTML),
          (chuyenkhoa.descriptionMarkdown = data.descriptionMarkdown),
          (chuyenkhoa.description = data.description);
        await chuyenkhoa.save();

        resolve({
          errCode: 0,
          message: "cap nhat Chuyenkhoa thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "chuyenkhoa bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllChuyenkhoaService: getAllChuyenkhoaService,
  getChuyenkhoaIdService: getChuyenkhoaIdService,
  createChuyenkhoaService: createChuyenkhoaService,
  editChuyenkhoaService: editChuyenkhoaService,
  deleteChuyenkhoaService: deleteChuyenkhoaService,
};
