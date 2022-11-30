import db from "../models/index";

import searchThuocService from "../services/timkiemService";

// let searchThuocController = async (req, res) => {
//   try {
//     let infor = await searchThuocService.searchThuocService(req.query.data);
//     return res.status(200).json(infor);
//   } catch (e) {
//     return res.status(500).json({
//       errCode: -1,
//       errMessage: "Error from the server...",
//     });
//   }

// };

let searchThuocController = async (req, res) => {
  const { Op } = require("sequelize");
  if (req.params.data === "all") {
    let sanpham = await db.thuocs.findAll();
    return res.status(200).json(sanpham);
  } else {
    let sanpham = await db.thuocs.findAll({
      where: {
        tenthuoc: {
          [Op.like]: `%${req.params.data}%`,
        },
      },
    });
    return res.status(200).json(sanpham);
  }
};

module.exports = {
  searchThuocController: searchThuocController,
};
