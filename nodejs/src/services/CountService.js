import db from "../models/index";
require("dotenv").config();

let demsoluongdangky = (id_vienchuc) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.lichbacsikhams.findAll({
        where: {
          id_vienchuc: id_vienchuc,
        },
      });
      let tong = 0;
      if (res.length === 0) {
        resolve({
          data: 0,
          errCode: 2,
        });
      } else {
        for (let i = 0; i <= res.length; i++) {
          let temp = await db.dangkys.count({
            where: { id_lichbacsikham: res[i].id },
            raw: false,
            nest: true,
          });

          tong = tong + temp;
          if (i === res.length - 1) {
            resolve({
              data: tong,
              errCode: 0,
            });
          }
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  demsoluongdangky: demsoluongdangky,
};
