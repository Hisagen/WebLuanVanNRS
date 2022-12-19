import db from "../models/index";
require("dotenv").config();

let getHinhAnhPhieuChiDinh = (id_dangky) => {
  return new Promise(async (resolve, reject) => {
    if (id_dangky) {
      let image = await db.hinhanhchidinhs.findAll({
        include: [
          {
            model: db.phieuchidinhs,
            as: "hinhanhpcd_phieuchidinh",
            include: [
              {
                model: db.phieukhams,
                as: "phieuchidinhphieukham",
                where: { id_dangky: id_dangky, trangthai: "Đã lập đơn thuốc" },
              },
            ],
          },

          { model: db.dichvus, as: "hinhanh_dichvu" },
        ],
        // raw: true,
        // nest: true,
      });
      let array = [];
      let array2 = [];
      console.log("================> id", image?.phieuchidinhs?.id);
      if (image && image.length > 0) {
        image.map((item) => {
          if (item.hinhanhpcd_phieuchidinh != null) {
            let obj = {};
            (obj.tendv = item.hinhanh_dichvu.tendichvu),
              (obj.image =
                "http://localhost:3002/Image/ChiDinh/" + item.imageName);
            array.push(obj);
            array2.push(item);
          }
        });
      }

      resolve({
        errCode: 0,
        data: array,
        data2: array2,
      });
    } else {
      resolve({
        errCode: 1,
        message: "Chưa truyền Lịch Đăng Ký",
      });
    }
  });
};

module.exports = {
  getHinhAnhPhieuChiDinh: getHinhAnhPhieuChiDinh,
};
