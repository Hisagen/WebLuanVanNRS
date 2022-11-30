import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import { reject } from "bcrypt/promises";
import { resolve } from "app-root-path";

let getAllLichbacsikhamService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let lichbacsikhams = await db.lichbacsikhams.findAll();
      resolve({
        errCode: 0,
        data: lichbacsikhams,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let bulkCreateScheduele = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let a = "";
      let scheduleSang = [
        {
          khunggio: "07:00-7:30",
        },
        {
          khunggio: "07:30-8:00",
        },
        {
          khunggio: "08:00-8:30",
        },
        {
          khunggio: "08:30-9:00",
        },
        {
          khunggio: "09:00-9:30",
        },
        {
          khunggio: "09:30-10:00",
        },
        {
          khunggio: "10:00-10:30",
        },
        {
          khunggio: "10:30-11:00",
        },
        {
          khunggio: "11:00-11:30",
        },
      ];
      let scheduleChieu = [
        {
          khunggio: "13:00-13:30",
        },
        {
          khunggio: "13:30-14:00",
        },
        {
          khunggio: "14:00-14:30",
        },
        {
          khunggio: "14:30-15:00",
        },
        {
          khunggio: "15:00-15:30",
        },
        {
          khunggio: "15:30-16:00",
        },
        {
          khunggio: "16:00-16:30",
        },
        {
          khunggio: "16:30-17:00",
        },
      ];
      if (
        !data.arrSchedule ||
        !data.id_vienchuc ||
        !data.ngay ||
        !data.id_phong
      ) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen lichbacsikham",
        });
      } else {
        let schedule = data.arrSchedule;
        let existing = await db.lichbacsikhams.findAll({
          where: {
            id_chuyenkhoa: data.idChuyenKhoa,
            ngay: data.ngay,
          },
          raw: true,
        });

        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.ngay = new Date(item.ngay).getTime();
            return item;
          });
        }

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          if (a.id_vienchuc === b.id_vienchuc) {
            return (
              a.ngay == b.ngay &&
              a.id_buoi === b.id_buoi &&
              a.id_vienchuc === b.id_vienchuc
            );
          } else {
            return (
              a.ngay == b.ngay &&
              a.id_buoi === b.id_buoi &&
              a.id_phong === b.id_phong
            );
          }
        });

        if (toCreate && toCreate.length > 0) {
          let temp = await db.lichbacsikhams.bulkCreate(toCreate);
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].id_buoi === 1) {
              scheduleSang.map(async (item, index) => {
                await db.lichkhams.create({
                  id_lichbacsikham: temp[i].id,
                  khunggio: scheduleSang[index].khunggio,
                });
              });
            } else {
              scheduleChieu.map(async (item, index) => {
                await db.lichkhams.create({
                  id_lichbacsikham: temp[i].id,
                  khunggio: scheduleChieu[index].khunggio,
                });
              });
            }
          }
          resolve({
            errCode: 0,
            errMessage: "Ok",
            toCreate,
            a,
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Error",
            toCreate,
            a,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBacsiNgayLichbacsikhamIdService = (id_vienchuc, ngay) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_vienchuc || !ngay) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen ngay va vien chuc lichbacsikham!",
        });
      } else {
        let test = Number(ngay);
        // let temp = new Date(ngay);

        let data = await db.lichbacsikhams.findAll({
          where: {
            id_vienchuc: id_vienchuc,
            ngay: test,
          },
          include: [
            { model: db.buois, as: "lichbacsikhambuoi" },
            { model: db.vienchucs, as: "lichbacsikhamvienchuc" },
            { model: db.lichkhams, as: "lichkhamlichbacsikham" },
            {
              model: db.phongs,
              as: "lichbacsikhamphong",
              include: [{ model: db.chuyenkhoas, as: "phongchuyenkhoa" }],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data !== []) {
          let array = [];
          for (let i = 0; i < data.length; i++) {
            let test = await db.lichkhams.findAll({
              where: {
                id_lichbacsikham: data[i]?.id,
              },
              include: [
                {
                  model: db.lichbacsikhams,
                  as: "lichkhamlichbacsikham",
                  include: [
                    {
                      model: db.phongs,
                      as: "lichbacsikhamphong",

                      include: [
                        { model: db.chuyenkhoas, as: "phongchuyenkhoa" },
                      ],
                    },
                  ],
                },
              ],
              raw: false,
              nest: true,
            });

            array.push(test);

            // return array;
          }

          if (array.length > 0) {
            data.push(array);
          }
        }
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

let CountDangKy = (id_lichkham) => {
  return new Promise((resolve, reject) => {
    try {
      let res = db.dangkys.count({
        // group: "id_lichkham",
        where: { id_lichkham: id_lichkham },
      });

      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteLichbacsikhamService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundLichbacsikham = await db.lichbacsikhams.findOne({
      where: { id: id },
    });
    if (!foundLichbacsikham) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay lichbacsikham`,
      });
    } else {
      // let temp = await db.lichkhams.findAll({
      //   where: {
      //     id_lichbacsikham: id,
      //   },
      // });
      await db.lichkhams.destroy({
        where: {
          id_lichbacsikham: id,
        },
      });
      await db.lichbacsikhams.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        errMessage: `lichbacsikham da duoc xoa`,
      });
    }
  });
};

let getLichbacsikhamIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen lichbacsikham!",
        });
      } else {
        let data = await db.lichbacsikhams.findOne({
          where: {
            id: id,
          },
          include: [
            { model: db.buois, as: "lichbacsikhambuoi" },
            {
              model: db.vienchucs,
              as: "lichbacsikhamvienchuc",
              attributes: {
                exclude: ["image", "contentHTML", "contentMarkdown"],
              },
            },
            {
              model: db.phongs,
              as: "lichbacsikhamphong",
              include: [
                {
                  model: db.chuyenkhoas,
                  as: "phongchuyenkhoa",
                  attributes: {
                    exclude: [
                      "image",
                      "descriptionHTML",
                      "descriptionMarkdown",
                    ],
                  },
                },
              ],
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

let editLichbacsikhamService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen id",
        });
      }
      let lichbacsikham = await db.lichbacsikhams.findOne({
        where: { id: data.id },
        raw: false,
      });

      if (lichbacsikham) {
        let existing = await db.lichbacsikhams.findAll({
          where: {
            id_chuyenkhoa: data.id_chuyenkhoa,
            ngay: data.ngay,
          },
          raw: true,
        });

        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            item.ngay = new Date(item.ngay).getTime();
            return item;
          });
        }
        let array = [];
        array.push(data);
        let toCreate = _.differenceWith(array, existing, (a, b) => {
          if (a.id_vienchuc === b.id_vienchuc) {
            return (
              a.ngay == b.ngay &&
              a.id_buoi === b.id_buoi &&
              a.id_vienchuc === b.id_vienchuc
            );
          } else {
            return (
              a.ngay == b.ngay &&
              a.id_buoi === b.id_buoi &&
              a.id_phong === b.id_phong
            );
          }
        });

        if (toCreate && toCreate.length > 0) {
          (lichbacsikham.id_buoi = data.id_buoi),
            (lichbacsikham.id_phong = data.id_phong),
            (lichbacsikham.ngay = data.ngay),
            (lichbacsikham.id_vienchuc = data.id_vienchuc);
          await lichbacsikham.save();

          resolve({
            errCode: 0,
            message: "cap nhat lichbacsikham thanh cong",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Error",
          });
        }
      } else {
        resolve({
          errCode: 1,
          errMessage: "lichbacsikham bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBacsiLichbacsikhamIdService = (id_vienchuc) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_vienchuc) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen lichbacsikham!",
        });
      } else {
        let data = await db.lichbacsikhams.findAll({
          where: {
            id_vienchuc: id_vienchuc,
          },
          include: [
            { model: db.buois, as: "lichbacsikhambuoi" },
            {
              model: db.vienchucs,
              as: "lichbacsikhamvienchuc",
              attributes: {
                exclude: ["image", "contentHTML", "contentMarkdown"],
              },
            },
            {
              model: db.phongs,
              as: "lichbacsikhamphong",
              include: [
                {
                  model: db.chuyenkhoas,
                  as: "phongchuyenkhoa",
                  attributes: {
                    exclude: [
                      "image",
                      "descriptionHTML",
                      "descriptionMarkdown",
                    ],
                  },
                },
              ],
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

let getAllChuyenkhoaLichbacsikhamService = (id_chuyenkhoa) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_chuyenkhoa) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen chuyen khoa lichbacsikham!",
        });
      } else {
        let data = await db.lichbacsikhams.findAll({
          // attributes: [
          //   "id",
          //   "id_vienchuc",
          //   "id_buoi",
          //   "id_phong",
          //   "id_chuyenkhoa",
          //   "ngay",
          //   "ghichu",
          // ],

          include: [
            // { model: db.buois, as: "lich_buoi" },
            {
              model: db.buois,
              as: "lichbacsikhambuoi",
            },
            {
              model: db.vienchucs,
              as: "lichbacsikhamvienchuc",
              where: {
                id_chuyenkhoa: id_chuyenkhoa,
              },
              attributes: {
                exclude: ["image", "contentHTML", "contentMarkdown"],
              },
            },
            {
              model: db.phongs,
              as: "lichbacsikhamphong",
              include: [
                {
                  model: db.chuyenkhoas,
                  as: "phongchuyenkhoa",
                  attributes: {
                    exclude: [
                      "image",
                      "descriptionHTML",
                      "descriptionMarkdown",
                    ],
                  },
                },
              ],
            },
          ],
          raw: true,
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
let kiemtrakhixoavasua = (id_lichbacsikham) => {
  return new Promise(async (resolve, reject) => {
    try {
      let find = await db.dangkys.count({
        where: { id_lichbacsikham: id_lichbacsikham },
      });
      if (find > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllLichbacsikhamService: getAllLichbacsikhamService,
  getLichbacsikhamIdService: getLichbacsikhamIdService,
  // createLichbacsikhamService: createLichbacsikhamService,
  editLichbacsikhamService: editLichbacsikhamService,
  deleteLichbacsikhamService: deleteLichbacsikhamService,
  bulkCreateScheduele: bulkCreateScheduele,
  getBacsiLichbacsikhamIdService: getBacsiLichbacsikhamIdService,
  getBacsiNgayLichbacsikhamIdService: getBacsiNgayLichbacsikhamIdService,
  getAllChuyenkhoaLichbacsikhamService: getAllChuyenkhoaLichbacsikhamService,
  CountDangKy: CountDangKy,
  kiemtrakhixoavasua: kiemtrakhixoavasua,
};
