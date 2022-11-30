import dangkyService from "../services/dangkyService";

let getAllDangky = async (req, res) => {
  try {
    let infor = await dangkyService.getAllDangkyService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getDangkyId = async (req, res) => {
  try {
    let infor = await dangkyService.getDangkyIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let createDangky = async (req, res) => {
  let message = await dangkyService.createDangkyService(req.body);
  return res.status(200).json(message);
};

let editDangky = async (req, res) => {
  let data = req.body;
  let message = await dangkyService.editDangkyService(data);
  return res.status(200).json(message);
};

let deleteDangky = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parament!",
    });
  }
  let message = await dangkyService.deleteDangkyService(req.body.id);
  return res.status(200).json(message);
};

let getBacsiDangkyId = async (req, res) => {
  try {
    let infor = await dangkyService.getBacsiDangkyIdService(
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

let getBacsiOneDangkyId = async (req, res) => {
  try {
    let infor = await dangkyService.getBacsiDangkyIdService(
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

let getVienchucDangkyId = async (req, res) => {
  try {
    let infor = await dangkyService.getVienchucDangkyIdService(
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

let getIdDangKyTheoBenhnhan = async (req, res) => {
  try {
    let infor = await dangkyService.getIdDangKyTheoBenhnhanService(
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

let kiemtradangkyController = async (req, res) => {
  try {
    let infor = await dangkyService.kiemtradangky(
      req.body.id_lichbacsikham,
      req.body.id_benhnhan
    );
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let timidtheovienchucngayController = async (req, res) => {
  try {
    let infor = await dangkyService.timidtheovienchucngay(
      req.body.id_vienchuc,
      req.body.ngay
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
  getAllDangky: getAllDangky,
  getDangkyId: getDangkyId,
  createDangky: createDangky,
  editDangky: editDangky,
  deleteDangky: deleteDangky,
  getBacsiDangkyId: getBacsiDangkyId,
  getBacsiOneDangkyId: getBacsiOneDangkyId,
  getVienchucDangkyId: getVienchucDangkyId,
  getIdDangKyTheoBenhnhan: getIdDangKyTheoBenhnhan,
  kiemtradangkyController: kiemtradangkyController,
  timidtheovienchucngayController: timidtheovienchucngayController,
};
