import db from "../models/index";
require("dotenv").config();

let searchAll = (id) => {
  return new Promise(async (resolve, reject) => {
    let dataChuyenKhoa = await db.chuyenkhoas.findAll();

    let temp = [
      {
        link: `/page-all-doctor`,
        title: "Tất cả bác sĩ",
      },
    ];
    let bacsi = await db.vienchucs.findAll({
      where: { id_chucvu: 5 },
    });
    let chuyenkhoa = await db.chuyenkhoas.findAll();
    // for (let i = 0; i < bacsi.length; i++) {
    if (bacsi && bacsi.length) {
      bacsi.map((item, index) => {
        let test = {};
        test.link = `api/get-id-bacsi/${item.id}`;
        test.title = `Bác sĩ ${item.hoten}`;
        test.img = `http://localhost:3002/Image/ChucVu/${item.imageName}`;
        temp.push(test);
      });
      let objCK = {
        link: `/api/get-id-chuyenkhoa/${dataChuyenKhoa[0].id}`,
        title: "Tất cả chuyên khoa",
      };
      temp.push(objCK);
      if (chuyenkhoa && chuyenkhoa.length > 0) {
        chuyenkhoa.map((item, index) => {
          let test = {};
          test.link = `api/get-id-chuyenkhoa/${item.id}`;
          test.title = `Chuyên khoa ${item.tenchuyenkhoa}`;
          test.img = `http://localhost:3002/Image/ChuyenKhoa/${item.imageName}`;
          temp.push(test);
        });
      }
      let objQT = {
        link: `/quy-trinh`,
        title: "Quy Trình",
      };
      let objDV = {
        link: `/dichvu`,
        title: "Dịch Vụ",
      };
      temp.push(objQT);
      temp.push(objDV);

      let allDichVu = await db.giadichvus.findAll({
        where: { trangthai: "Giá hiện tại" },
        attributes: ["id_dichvu", "ngaytao", "gia_bhyt", "gia_dichvu"],
        include: [{ model: db.dichvus, as: "giadichvu_dichvu" }],
      });
      if (allDichVu && allDichVu.length > 0) {
        allDichVu.map((item, index) => {
          let test = {};
          test.link = `/dichvu-name`;
          test.title = `Dịch vụ ${item?.giadichvu_dichvu?.tendichvu}`;
          temp.push(test);
        });
      }
      resolve({
        data: temp,
        errCode: 0,
      });

      // resolve({
      //   data: temp,
      //   errCode: 0,
      // });
    }
  });
};

let searchLichBacsikham = (id_vienchuc) => {
  return new Promise(async (resolve, reject) => {
    let lich = await db.lichbacsikhams.findAll({
      where: { id_vienchuc: id_vienchuc },
    });

    resolve({
      data: lich,
      errCode: 0,
    });
  });
};
module.exports = {
  searchAll: searchAll,
  searchLichBacsikham: searchLichBacsikham,
};
