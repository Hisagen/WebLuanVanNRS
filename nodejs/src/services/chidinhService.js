import db from "../models/index";
require("dotenv").config();
// import tempService from './tempService'
let getAllChidinhService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let chidinhs = await db.chidinhs.findAll();
      resolve({
        errCode: 0,
        data: chidinhs,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createChidinhService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id_thuoc ||
        !data.id_phieukham ||
        !data.id_phieukham ||
        !data.soluong ||
        !data.lieudung ||
        !data.cachdung
      ) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen chidinh",
        });
      } else {
        let lichkham1 = await db.chidinhs.create({
          id_thuoc: data.id_thuoc,
          id_phieukham: data.id_phieukham,
          soluong: data.soluong,
          lieudung: data.lieudung,
          cachdung: data.cachdung,
        });
        // let lichkham1 = await db.chidinhs.findAll({
        //     limit: 1,
        //     where: { roleId: 'R2' },
        //     order: [['createdAt', 'DESC']],
        //     raw: true,
        //     nest: true
        // })
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

let deleteChidinhService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundLichkham = await db.chidinhs.findOne({
      where: { id: id },
    });
    if (!foundLichkham) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay chidinh`,
      });
    }
    await db.chidinhs.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `chidinh da duoc xoa`,
    });
  });
};

let getChidinhIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chidinh!",
        });
      } else {
        let data = await db.chidinhs.findOne({
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

let editChidinhService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen chidinh",
        });
      }
      let chidinh = await db.chidinhs.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (chidinh) {
        (chidinh.id_thuoc = data.id_thuoc),
          (chidinh.id_phieukham = data.id_phieukham),
          (chidinh.soluong = data.soluong),
          (chidinh.lieudung = data.lieudung),
          (chidinh.cachdung = data.cachdung),
          await chidinh.save();

        resolve({
          errCode: 0,
          message: "cap nhat chidinh thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "chidinh bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateChidinh = (data) => {
  return new Promise(async (resolve, reject) => {
    // let data1 = ''
    // let data1 = await tempService.getAllTempService()
    try {
      if (!data.arrThuoc || !data.chuandoan || !data.loidan) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen thuoc",
        });
      } else {
        let thuoc = data.arrThuoc;
        let phieukham = await db.phieukhams.create({
          chuandoan: data.chuandoan,
          loidan: data.loidan,
          ghichu: data.ghichu,
          id_dangky: data.id_dangky,
        });
        if (thuoc && thuoc.length > 0) {
          thuoc = thuoc.map((item) => {
            item.id_phieukham = phieukham.id;
            return item;
          });

          await db.chidinhs.bulkCreate(thuoc);
          if (thuoc && thuoc.length > 0) {
            thuoc = thuoc.map((item) => {
              db.temps.destroy({
                where: { id: item.id },
              });
            });
          }
        }
        let dangky = await db.dangkys.findOne({
          where: { id: data.id_dangky },
          raw: false,
        });
        if (dangky) {
          dangky.trangthai = "Đã khám";
          await dangky.save();
        }
        resolve({
          errCode: 0,
          errMessage: "Thành Công",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDangkyChidinhIdService = (id_dangky) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_dangky) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chidinh!",
        });
      } else {
        let data = await db.chidinhs.findAll({
          include: [
            {
              model: db.phieukhams,
              as: "chidinhphieukham",
              where: { id_dangky: id_dangky },
              include: [
                {
                  model: db.dangkys,
                  as: "phieukhamdangky",
                  include: [
                    {
                      model: db.benhnhans,
                      as: "dangkybenhnhan",
                    },
                  ],
                },
              ],
            },
            { model: db.thuocs, as: "chidinhthuoc" },
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

let getDangkyChidinhIdService1 = (id_dangky) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_dangky) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chidinh!",
        });
      } else {
        let data = await db.chidinhs.findOne({
          include: [
            {
              model: db.phieukhams,
              as: "chidinhphieukham",
              where: { id_dangky: id_dangky },
              include: [
                {
                  model: db.dangkys,
                  as: "phieukhamdangky",
                  include: [
                    {
                      model: db.benhnhans,
                      as: "dangkybenhnhan",
                    },
                  ],
                },
              ],
            },
            { model: db.thuocs, as: "chidinhthuoc" },
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

let getBenhNhanChidinhIdService = (id_benhnhan) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_benhnhan) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chidinh!",
        });
      } else {
        let data = await db.chidinhs.findAll({
          include: [
            {
              model: db.phieukhams,
              as: "chidinhphieukham",
              include: [
                {
                  model: db.dangkys,
                  as: "phieukhamdangky",
                  where: { id_benhnhan: id_benhnhan },
                  include: [
                    {
                      model: db.benhnhans,
                      as: "dangkybenhnhan",
                    },
                  ],
                },
              ],
            },
            { model: db.thuocs, as: "chidinhthuoc" },
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

let getBenhNhanChidinhIdService1 = (id_benhnhan) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_benhnhan) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chidinh!",
        });
      } else {
        let data = await db.chidinhs.findOne({
          include: [
            {
              model: db.phieukhams,
              as: "chidinhphieukham",
              include: [
                {
                  model: db.dangkys,
                  as: "phieukhamdangky",
                  where: { id_benhnhan: id_benhnhan },
                  include: [
                    {
                      model: db.benhnhans,
                      as: "dangkybenhnhan",
                    },
                  ],
                },
              ],
            },
            { model: db.thuocs, as: "chidinhthuoc" },
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

let getPhieuKhamChidinhIdService = (id_phieukham) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_phieukham) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chidinh!",
        });
      } else {
        let data = await db.chidinhs.findAll({
          where: { id_phieukham: id_phieukham },
          include: [
            {
              model: db.phieukhams,
              as: "chidinhphieukham",
              include: [
                {
                  model: db.dangkys,
                  as: "phieukhamdangky",
                  // where: { id_benhnhan: id_benhnhan },
                  include: [
                    {
                      model: db.benhnhans,
                      as: "dangkybenhnhan",
                    },
                  ],
                },
              ],
            },
            { model: db.thuocs, as: "chidinhthuoc" },
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
  getAllChidinhService: getAllChidinhService,
  createChidinhService: createChidinhService,
  deleteChidinhService: deleteChidinhService,
  getChidinhIdService: getChidinhIdService,
  editChidinhService: editChidinhService,
  bulkCreateChidinh: bulkCreateChidinh,
  getDangkyChidinhIdService: getDangkyChidinhIdService,
  getDangkyChidinhIdService1: getDangkyChidinhIdService1,
  getBenhNhanChidinhIdService: getBenhNhanChidinhIdService,
  getBenhNhanChidinhIdService1: getBenhNhanChidinhIdService1,
  getPhieuKhamChidinhIdService: getPhieuKhamChidinhIdService,
};
