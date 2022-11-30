import db from "../models/index";
require("dotenv").config();
import xaphuongService from "./xaphuongService";

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vienchucData = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        let vienchuc = await db.vienchucs.findOne({
          where: {
            email: email,
            password: password,
          },
          include: [{ model: db.chucvus, as: "vienchucchucvu" }],
          raw: false,
          nest: true,
        });
        if (vienchuc) {
          vienchucData.errCode = 0;
          vienchucData.errMessage = `OK`;
          vienchucData.vienchuc = vienchuc;
        } else {
          vienchucData.errCode = 2;
          vienchucData.errMessage = `user not found`;
        }
      } else {
        vienchucData.errCode = 1;
        vienchucData.errMessage = `your's Email is not  exits`;
      }
      resolve(vienchucData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vienchuc = await db.vienchucs.findOne({
        where: {
          email: email,
        },
      });
      if (vienchuc) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllVienchucService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let vienchucs = await db.vienchucs.findAll({
        include: [
          { model: db.chucvus, as: "vienchucchucvu" },
          { model: db.chuyenkhoas, as: "vienchucchuyenkhoa" },
          {
            model: db.xaphuongs,
            as: "vienchucxaphuong",
            include: [
              {
                model: db.huyenquans,
                as: "xaphuonghuyenquan",
                include: [
                  {
                    model: db.tinhthanhs,
                    as: "huyenquantinhthanh",
                  },
                ],
              },
            ],
          },
          { model: db.tdhvs, as: "vienchuctdhv" },
        ],
        raw: false,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: vienchucs,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createVienchucService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.hoten) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen vien chuc",
        });
      } else {
        await db.vienchucs.create({
          hoten: data.hoten,
          gioitinh: data.gioitinh,
          diachi: data.diachi,
          sdt: data.sdt,
          password: data.password,
          email: data.email,
          imagePath: data.filePath,
          imageName: data.fileName,
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.description,
          id_xaphuong: data.id_xaphuong,
          id_chuyenkhoa: data.id_chuyenkhoa,
          id_tdhv: data.id_tdhv,
          id_chucvu: data.id_chucvu,
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

let deleteVienchucService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundVienchuc = await db.vienchucs.findOne({
      where: { id: id },
    });
    if (!foundVienchuc) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay vien chuc`,
      });
    } else {
      if (foundVienchuc.imagePath !== null) {
        var fs = require("fs");
        fs.unlinkSync(foundVienchuc.imagePath);
      }

      await db.vienchucs.destroy({
        where: { id: id },
      });

      resolve({
        errCode: 0,
        errMessage: `vien chuc da duoc xoa`,
      });
    }
  });
};

let getVienchucIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen vien chuc!",
        });
      } else {
        let data = await db.vienchucs.findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: db.chucvus,
              as: "vienchucchucvu",
              attributes: ["tenchucvu"],
            },
            {
              model: db.chuyenkhoas,
              as: "vienchucchuyenkhoa",
              attributes: ["tenchuyenkhoa"],
            },
            {
              model: db.xaphuongs,
              as: "vienchucxaphuong",
              attributes: ["tenxaphuong"],
            },
            { model: db.tdhvs, as: "vienchuctdhv", attributes: ["tentdhv"] },
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

let getVienchucChucvuIdService = (id_chucvu) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_chucvu) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen id chuc vu !",
        });
      } else {
        let data = await db.vienchucs.findAll({
          where: {
            id_chucvu: id_chucvu,
          },
          include: [
            {
              model: db.chucvus,
              as: "vienchucchucvu",
              attributes: ["tenchucvu"],
            },
            {
              model: db.chuyenkhoas,
              as: "vienchucchuyenkhoa",
              attributes: ["tenchuyenkhoa"],
            },
            {
              model: db.xaphuongs,
              as: "vienchucxaphuong",
              attributes: ["tenxaphuong"],
            },
            { model: db.tdhvs, as: "vienchuctdhv", attributes: ["tentdhv"] },
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

let getVienchucChuyenkhoaIdService = (id_chuyenkhoa) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_chuyenkhoa) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen id chuyenkhoa !",
        });
      } else {
        let data = await db.vienchucs.findAll({
          where: {
            id_chuyenkhoa: id_chuyenkhoa,
            id_chucvu: 5,
          },
          include: [
            {
              model: db.chucvus,
              as: "vienchucchucvu",
              attributes: ["tenchucvu"],
            },
            {
              model: db.chuyenkhoas,
              as: "vienchucchuyenkhoa",
              attributes: ["tenchuyenkhoa"],
            },
            {
              model: db.xaphuongs,
              as: "vienchucxaphuong",
              attributes: ["tenxaphuong"],
            },
            { model: db.tdhvs, as: "vienchuctdhv", attributes: ["tentdhv"] },
          ],

          raw: false,
          nest: true,
        });
        if (!data) {
          resolve({
            errCode: 0,
            data: {},
          });
        } else {
          let giakham = await db.giakhams.findOne({
            attributes: ["id_chuyenkhoa", "ngaytao", "gia_bhyt", "gia_dichvu"],
            where: {
              id_chuyenkhoa: id_chuyenkhoa,
            },
          });

          resolve({
            errCode: 0,
            data: data,
            giakham: giakham,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let editVienchucService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen vien chuc",
        });
      }
      let Vienchuc = await db.vienchucs.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (Vienchuc) {
        Vienchuc.hoten = data.hoten;
        (Vienchuc.gioitinh = data.gioitinh),
          (Vienchuc.diachi = data.diachi),
          (Vienchuc.sdt = data.sdt),
          (Vienchuc.password = data.password),
          (Vienchuc.email = data.email),
          (Vienchuc.image = data.avatar),
          (Vienchuc.contentHTML = data.contentHTML),
          (Vienchuc.contentMarkdown = data.contentMarkdown),
          (Vienchuc.description = data.description),
          (Vienchuc.id_xaphuong = data.id_xaphuong),
          (Vienchuc.id_chuyenkhoa = data.id_chuyenkhoa),
          (Vienchuc.id_tdhv = data.id_tdhv),
          (Vienchuc.id_chucvu = data.id_chucvu),
          await Vienchuc.save();
        resolve({
          errCode: 0,
          message: "cap nhat vien chuc thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "vien chuc bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBacsiIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen id bacsi !",
        });
      } else {
        let data = await db.vienchucs.findOne({
          where: {
            id: id,
            id_chucvu: 5,
          },
          include: [
            {
              model: db.chucvus,
              as: "vienchucchucvu",
              attributes: ["tenchucvu"],
            },
            {
              model: db.chuyenkhoas,
              as: "vienchucchuyenkhoa",
              attributes: ["id", "tenchuyenkhoa"],
              // {
              //   model: db.giakhams,
              //   as: "giakham_chuyenkhoa",
              //   attributes: ["gia_bhyt", "gia_dichvu"],
              // },
            },
            {
              model: db.xaphuongs,
              as: "vienchucxaphuong",
              attributes: ["tenxaphuong"],
            },
            { model: db.tdhvs, as: "vienchuctdhv", attributes: ["tentdhv"] },
          ],

          raw: false,
          nest: true,
        });
        if (!data) {
          resolve({
            errCode: 0,
            data: {},
          });
        } else {
          let giakham = await db.giakhams.findOne({
            attributes: ["id_chuyenkhoa", "ngaytao", "gia_bhyt", "gia_dichvu"],
            where: {
              id_chuyenkhoa: data.id_chuyenkhoa,
            },
          });

          resolve({
            errCode: 0,
            data: data,
            giakham: giakham,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllVienchucService: getAllVienchucService,
  getVienchucIdService: getVienchucIdService,
  createVienchucService: createVienchucService,
  editVienchucService: editVienchucService,
  deleteVienchucService: deleteVienchucService,
  checkUserEmail: checkUserEmail,
  handleUserLogin: handleUserLogin,
  getVienchucChucvuIdService: getVienchucChucvuIdService,
  getVienchucChuyenkhoaIdService: getVienchucChuyenkhoaIdService,
  getBacsiIdService: getBacsiIdService,
};
