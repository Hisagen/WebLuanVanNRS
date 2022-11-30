import db from "../models/index";
// import db from "../serverSQL";
require("dotenv").config();

import { promise, reject } from "bcrypt/promises";
import _ from "lodash";
import emailService from "./emailService";
import emailService1 from "./emailService1";
import { v4 as uuidv4 } from "uuid";

// let buildUrlEmail = (doctorId, token) => {
//     let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
//     return result;
// }

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if (!data.tenkhungio || !data.tenbacsi || !data.email || !data.phong || !data.chuyenkhoa
      //     || !data.ngay || !data.tenbenhnhan || !data.sdtbacsi || !data.ngay) {
      //     resolve({
      //         errCode: 1,
      //         errMessage: 'Missing parameter'
      //     });
      // } else {
      // let token = uuidv4();
      await emailService.sendSimpleEmail({
        reciverEmail: data.email,
        patientName: data.tenbenhnhan,
        time: data.tenkhungio,
        doctorName: data.tenbacsi,
        phong: data.phong,
        chuyenkhoa: data.chuyenkhoa,
        sdtbacsi: data.sdtbacsi,
        ngay: data.ngay,
      });
      // }
      resolve({
        errCode: 0,
        errMessage: "save infor doctor succeed!",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let BenhNhanPhanHoiService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await emailService1.sendSimpleEmail1({
        email: data.email,
        ten: data.ten,
        tieude: data.tieude,
        noidung: data.noidung,
      });
      // }
      resolve({
        errCode: 0,
        errMessage: "save infor doctor succeed!",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};
// let postVerifyBookAppointment = (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!data.token || !data.doctorId) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Missing paramenter'
//                 })
//             } else {
//                 let appointment = await db.Booking.findOne({
//                     where: {
//                         doctorId: data.doctorId,
//                         token: data.token,
//                         statusId: 'S1'
//                     },
//                     raw: false
//                 })
//                 if (appointment) {
//                     appointment.statusId = 'S2';

//                     await appointment.save()
//                     resolve({
//                         errCode: 0,
//                         errMessage: 'Update the appointment succeed!'
//                     })
//                 } else {
//                     resolve({
//                         errCode: 2,
//                         errMessage: 'Appoinment has been activated or does not exits'
//                     })
//                 }
//             }

//         } catch (e) {
//             reject(e);
//         }
//     })
// }

let getAllBenhnhanService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let benhnhans = await db.benhnhans.findAll({
        include: [{ model: db.xaphuongs, as: "benhnhanxaphuong" }],
        raw: false,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: benhnhans,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let createBenhnhanService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.hoten) {
        resolve({
          errCode: 1,
          errmessage: "chưa có họ tên",
        });
      } else {
        let benhnhan = await db.benhnhans.create({
          hoten: data.hoten,
          ngaysinh: data.ngaysinh,
          gioitinh: data.gioitinh,
          sdt: data.sdt,
          email: data.email,
          password: data.password,
          nghenghiep: data.nghenghiep,
          diachi: data.diachi,
          cccd: data.cccd,
          id_xaphuong: data.id_xaphuong,
        });
        resolve({
          errCode: 0,
          message: "ok",
          data: benhnhan,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBenhnhanService = (id) => {
  return new Promise(async (resolve, reject) => {
    let foundBenhnhan = await db.benhnhans.findOne({
      where: { id: id },
    });
    if (!foundBenhnhan) {
      resolve({
        errCode: 2,
        errMessage: `khong tim thay benh nhan`,
      });
    }
    await db.benhnhans.destroy({
      where: { id: id },
    });
    resolve({
      errCode: 0,
      errMessage: `benh vien da duoc xoa`,
    });
  });
};

let getBenhnhanIdService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "chua truyen benh vien!",
        });
      } else {
        let data = await db.benhnhans.findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: db.xaphuongs,
              as: "benhnhanxaphuong",
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

let editBenhnhanService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Bạn Chưa Đăng Nhập",
        });
      }
      let benhnhan = await db.benhnhans.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (benhnhan) {
        (benhnhan.hoten = data.hoten),
          (benhnhan.ngaysinh = data.ngaysinh),
          (benhnhan.gioitinh = data.gioitinh),
          (benhnhan.sdt = data.sdt),
          (benhnhan.email = data.email),
          (benhnhan.nghenghiep = data.nghenghiep),
          (benhnhan.diachi = data.diachi),
          (benhnhan.cccd = data.cccd),
          (benhnhan.id_xaphuong = data.id_xaphuong),
          await benhnhan.save();

        resolve({
          errCode: 0,
          message: "Cập Nhật Thông Tin Thành Công",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Cập Nhật Không Thành Công",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postChidinhAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await emailService1.sendSimpleEmail({
        reciverEmail: data.email,
        patientName: data.tenbenhnhan,
        time: data.tenkhungio,
        doctorName: data.tenbacsi,
        phong: data.phong,
        chuyenkhoa: data.chuyenkhoa,
        sdtbacsi: data.sdtbacsi,
        ngay: data.ngay,
        chuandoan: data.chuandoan,
        loidan: data.loidan,
        ghichu: data.ghichu,
        cachdung: data.cachdung,
        lieudung: data.lieudung,
        soluong: data.soluong,
        tenthuoc: data.tenthuoc,
        dvt: data.dvt,
        cachdung1: data.cachdung1,
        lieudung1: data.lieudung1,
        soluong1: data.soluong1,
        tenthuoc1: data.tenthuoc1,
        dvt1: data.dvt1,
      });
      // }
      resolve({
        errCode: 0,
        errMessage: "save infor doctor succeed!",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleBenhnhanLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let benhnhanData = {};
      let isExist = await checkBenhnhanEmail({ email: email });
      if (isExist) {
        let benhnhan = await db.benhnhans.findOne({
          where: {
            email: email,
            password: password,
          },
          // include: [
          //     { model: db.chucvus, as: 'vienchucchucvu', },
          // ],
          // raw: false,
          // nest: true
        });
        if (benhnhan) {
          resolve({
            errCode: 0,
            benhnhan,
          });
        } else {
          benhnhanData.errCode = 2;
          benhnhanData.errMessage = `user not found`;
        }
        resolve(benhnhanData);
      } else {
        benhnhanData.errCode = 1;
        benhnhanData.errMessage = `your's Email is not  exits`;
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkBenhnhanEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let benhnhan = await db.benhnhans.findOne({
        where: {
          email: email.email,
        },
      });
      if (benhnhan) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let DoiMatKhauService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        let res = await db.benhnhans.findOne({
          where: {
            id: data.id,
          },
        });

        if (res) {
          res.password = data.passNew;
          res.save();
          resolve({
            errCode: 0,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let LayMatKhauService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data) {
        data.passNew = await create_random_pass(8);
        await emailService1.sendSimpleEmailLayMatKhau(data);

        resolve({
          errCode: 0,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

// hàm random pass

let create_random_pass = (leght) => {
  return new Promise(async (resolve, reject) => {
    try {
      let random_string = "";
      let char =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < leght; i++) {
        random_string += char.charAt(Math.floor(Math.random() * char.length));
      }
      resolve(random_string);
    } catch (e) {
      reject(e);
    }
  });
};

let testbenhnhanservice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = db.benhnhans.findAll();
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

let guismsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = db.benhnhans.findAll();
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getAllBenhnhanService: getAllBenhnhanService,
  getBenhnhanIdService: getBenhnhanIdService,
  createBenhnhanService: createBenhnhanService,
  editBenhnhanService: editBenhnhanService,
  deleteBenhnhanService: deleteBenhnhanService,
  postBookAppointment: postBookAppointment,
  postChidinhAppointment: postChidinhAppointment,
  handleBenhnhanLogin: handleBenhnhanLogin,
  checkBenhnhanEmail: checkBenhnhanEmail,
  BenhNhanPhanHoiService: BenhNhanPhanHoiService,
  DoiMatKhauService: DoiMatKhauService,
  LayMatKhauService: LayMatKhauService,
  create_random_pass: create_random_pass,
  // postVerifyBookAppointment: postVerifyBookAppointment
  testbenhnhanservice: testbenhnhanservice,
  guismsService: guismsService,
};
