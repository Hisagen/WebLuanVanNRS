import lichbacsikhamService from "../services/lichbacsikhamService";

let getAllLichbacsikham = async (req, res) => {
  try {
    let infor = await lichbacsikhamService.getAllLichbacsikhamService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getLichbacsikhamId = async (req, res) => {
  try {
    let infor = await lichbacsikhamService.getLichbacsikhamIdService(
      req.query.id
    );
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let createLichbacsikham = async (req, res) => {
  let message = await lichbacsikhamService.createLichbacsikhamService(req.body);
  return res.status(200).json(message);
};

let editLichbacsikham = async (req, res) => {
  let data = req.body;
  let message = await lichbacsikhamService.editLichbacsikhamService(data);
  return res.status(200).json(message);
};

let deleteLichbacsikham = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parament!",
    });
  }
  let message = await lichbacsikhamService.deleteLichbacsikhamService(
    req.body.id
  );
  return res.status(200).json(message);
};

let bulkCreateScheduele = async (req, res) => {
  try {
    let infor = await lichbacsikhamService.bulkCreateScheduele(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getBacsiLichbacsikhamId = async (req, res) => {
  try {
    let infor = await lichbacsikhamService.getBacsiLichbacsikhamIdService(
      req.query.id_vienchuc
    );
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getBacsiNgayLichbacsikhamId = async (req, res) => {
  try {
    let infor = await lichbacsikhamService.getBacsiNgayLichbacsikhamIdService(
      req.query.id_vienchuc,
      req.query.ngay
    );
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getAllChuyenkhoaLichbacsikham = async (req, res) => {
  try {
    let infor = await lichbacsikhamService.getAllChuyenkhoaLichbacsikhamService(
      req.query.id_chuyenkhoa
    );
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let CountDangKyController = async (req, res) => {
  try {
    let infor = await lichbacsikhamService.CountDangKy(req.body.id_lichkham);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let kiemtrakhixoavasuaController = async (req, res) => {
  try {
    let infor = await lichbacsikhamService.kiemtrakhixoavasua(
      req.body.id_lichbacsikham
    );
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};
module.exports = {
  getAllLichbacsikham: getAllLichbacsikham,
  getLichbacsikhamId: getLichbacsikhamId,
  createLichbacsikham: createLichbacsikham,
  editLichbacsikham: editLichbacsikham,
  deleteLichbacsikham: deleteLichbacsikham,
  bulkCreateScheduele: bulkCreateScheduele,
  getBacsiLichbacsikhamId: getBacsiLichbacsikhamId,
  getBacsiNgayLichbacsikhamId: getBacsiNgayLichbacsikhamId,
  getAllChuyenkhoaLichbacsikham: getAllChuyenkhoaLichbacsikham,
  CountDangKyController: CountDangKyController,
  kiemtrakhixoavasuaController: kiemtrakhixoavasuaController,
};
