import tangService from "../services/tangService";

let getAllTang = async (req, res) => {
  try {
    let infor = await tangService.getAllTangService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getTangId = async (req, res) => {
  try {
    let infor = await tangService.getTangIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let createTang = async (req, res) => {
  let message = await tangService.createTangService(req.body);
  return res.status(200).json(message);
};

let editTang = async (req, res) => {
  let data = req.body;
  let message = await tangService.editTangService(data);
  return res.status(200).json(message);
};

let deleteTang = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parament!",
    });
  }
  let message = await tangService.deleteTangService(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  getAllTang: getAllTang,
  getTangId: getTangId,
  createTang: createTang,
  editTang: editTang,
  deleteTang: deleteTang,
};
