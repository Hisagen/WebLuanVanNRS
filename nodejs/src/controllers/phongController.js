import phongService from "../services/phongService";

let getAllPhong = async (req, res) => {
  try {
    let infor = await phongService.getAllPhongService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getPhongId = async (req, res) => {
  try {
    let infor = await phongService.getPhongIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let createPhong = async (req, res) => {
  let message = await phongService.createPhongService(req.body);
  return res.status(200).json(message);
};

let editPhong = async (req, res) => {
  let data = req.body;
  let message = await phongService.editPhongService(data);
  return res.status(200).json(message);
};

let deletePhong = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parament!",
    });
  }
  let message = await phongService.deletePhongService(req.body.id);
  return res.status(200).json(message);
};

let getPhongChuyenkhoaId = async (req, res) => {
  try {
    let infor = await phongService.getPhongChuyenkhoaIdService({
      id_chuyenkhoa: req.query.id_chuyenkhoa,
      date_choose: req.query.date_choose,
      nameDoctor: req.query.nameDoctor,
      phong_choose: req.query.phong_choose,
    });
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

module.exports = {
  getAllPhong: getAllPhong,
  getPhongId: getPhongId,
  createPhong: createPhong,
  editPhong: editPhong,
  deletePhong: deletePhong,
  getPhongChuyenkhoaId: getPhongChuyenkhoaId,
};
