import db from "../models/index";
require("dotenv").config();

let getAllDangkyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dangkys = await db.dangkys.findAll({
        include: [
          { model: db.benhnhans, as: "dangkybenhnhan" },
          { model: db.lichkhams, as: "dangkylichkham" },
          { model: db.lichbacsikhams, as: "dangkylichbacsikham" },
        ],
        raw: false,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: dangkys,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createDangkyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.trangthai) {
        resolve({
          errCode: 1,
          errmessage: "chua truyen dangky",
        });
      } else {
        await db.dangkys.create({
          trangthaikham: data.trangthai,
          id_lichbacsikham: data.id_lichbacsikham,
          id_lichkham: data.id_lichkham,
          id_benhnhan: data.id_benhnhan,
          id_pttt: data.id_pttt,
          giakham: data.giakham,
          trangthaithanhtoan: data.trangthaitt,
          trieuchung: data.trieuchung,
          taikham: data.taikham,
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

let deleteDangkyService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundDangky = await db.dangkys.findOne({
      where: { id: id },
    });
    if (!foundDangky) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay dangky`,
      });
    }
    await db.dangkys.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `dangky da duoc xoa`,
    });
  });
};

let getDangkyIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen dangky!",
        });
      } else {
        let data = await db.dangkys.findOne({
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

let editDangkyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id_lichbacsikham ||
        !data.id_lichkham ||
        !data.id_benhnhan ||
        !data.trangthai
      ) {
        resolve({
          errCode: 2,
          errMessage: "chua truyen dangky",
        });
      }
      let dangky = await db.dangkys.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (dangky) {
        dangky.id_lichbacsikham = data.id_lichbacsikham;
        dangky.id_lichkham = data.id_lichkham;
        dangky.id_benhnhan = data.id_benhnhan;
        dangky.id_benhnhan = data.id_benhnhan;
        await dangky.save();

        resolve({
          errCode: 0,
          message: "cap nhat dangky thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "dangky bi rong",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getBacsiDangkyIdService = (id_vienchuc1, ngay1) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_vienchuc1 || !ngay1) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen dangky!",
        });
      } else {
        let data = await db.dangkys.findAll({
          include: [
            { model: db.lichkhams, as: "dangkylichkham" },
            { model: db.benhnhans, as: "dangkybenhnhan" },
            {
              model: db.lichbacsikhams,
              as: "dangkylichbacsikham",
              where: {
                id_vienchuc: id_vienchuc1,
                ngay: ngay1,
              },
              include: [{ model: db.phongs, as: "lichbacsikhamphong" }],
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

let getBacsiOneDangkyIdService = (id_vienchuc1, ngay1) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_vienchuc1 || !ngay1) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen dangky!",
        });
      } else {
        let data = await db.dangkys.findOne({
          include: [
            { model: db.lichkhams, as: "dangkylichkham" },
            { model: db.benhnhans, as: "dangkybenhnhan" },
            {
              model: db.lichbacsikhams,
              as: "dangkylichbacsikham",
              where: {
                id_vienchuc: id_vienchuc1,
                ngay: ngay1,
              },
              include: [{ model: db.phongs, as: "lichbacsikhamphong" }],
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

let getVienchucDangkyIdService = (id_vienchuc1) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id_vienchuc1) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen dangky!",
        });
      } else {
        let data = await db.dangkys.findAll({
          include: [
            { model: db.lichkhams, as: "dangkylichkham" },
            { model: db.benhnhans, as: "dangkybenhnhan" },
            {
              model: db.lichbacsikhams,
              as: "dangkylichbacsikham",
              where: {
                id_vienchuc: id_vienchuc1,
              },
              include: [
                {
                  model: db.phongs,
                  as: "lichbacsikhamphong",
                  include: [
                    {
                      model: db.chuyenkhoas,
                      as: "phongchuyenkhoa",
                    },
                  ],
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

let getIdDangKyTheoBenhnhanService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.dangkys.findAll({
        where: {
          id_benhnhan: id,
        },
        include: [
          {
            model: db.benhnhans,
            as: "dangkybenhnhan",
          },
          {
            model: db.lichkhams,
            as: "dangkylichkham",
          },
          {
            model: db.phuongthucthanhtoans,
            as: "phuongthucdangky",
          },

          {
            model: db.lichbacsikhams,
            as: "dangkylichbacsikham",
            include: [
              {
                model: db.vienchucs,
                as: "lichbacsikhamvienchuc",
                include: [
                  {
                    model: db.chuyenkhoas,
                    as: "vienchucchuyenkhoa",
                  },
                ],
              },
              {
                model: db.phongs,
                as: "lichbacsikhamphong",
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });

      resolve({
        data: res,
        errCode: 0,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let kiemtradangky = (id_lichbacsikham, id_benhnhan) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await db.dangkys.findAll({
        where: { id_lichbacsikham: id_lichbacsikham, id_benhnhan: id_benhnhan },
        raw: true,
      });
      if (check.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let timidtheovienchucngay = (id_vienchuc, ngay) => {
  return new Promise(async (resolve, reject) => {
    try {
      let danhsachid = await db.lichbacsikhams.findAll({
        where: {
          id_vienchuc: id_vienchuc,
          ngay: +ngay,
        },
        raw: true,
      });
      resolve(danhsachid);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllDangkyService: getAllDangkyService,
  getDangkyIdService: getDangkyIdService,
  createDangkyService: createDangkyService,
  editDangkyService: editDangkyService,
  deleteDangkyService: deleteDangkyService,
  getBacsiDangkyIdService: getBacsiDangkyIdService,
  getBacsiOneDangkyIdService: getBacsiOneDangkyIdService,
  getVienchucDangkyIdService: getVienchucDangkyIdService,
  getIdDangKyTheoBenhnhanService: getIdDangKyTheoBenhnhanService,
  kiemtradangky: kiemtradangky,
  timidtheovienchucngay: timidtheovienchucngay,
};
