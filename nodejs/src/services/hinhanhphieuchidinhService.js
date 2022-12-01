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
        ],
        // raw: true,
        // nest: true,
      });
      let array = [];
      if (image && image.length > 0) {
        image.map((item) => {
          if (item.hinhanhpcd_phieuchidinh != null) {
            console.log("có");
            array.push(item);
          }
        });
      }

      resolve({
        errCode: 0,
        data: array,
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
