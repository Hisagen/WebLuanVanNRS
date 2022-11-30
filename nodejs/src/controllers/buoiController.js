import buoiService from "../services/buoiService";

let getAllBuoi = async (req, res) => {
  try {
    let infor = await buoiService.getAllBuoiService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getBuoiId = async (req, res) => {
  try {
    let infor = await buoiService.getBuoiIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let createBuoi = async (req, res) => {
  let message = await buoiService.createBuoiService(req.body);
  return res.status(200).json(message);
};

let editBuoi = async (req, res) => {
  let data = req.body;
  let message = await buoiService.editBuoiService(data);
  return res.status(200).json(message);
};

let deleteBuoi = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parament!",
    });
  }
  let message = await buoiService.deleteBuoiService(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  getAllBuoi: getAllBuoi,
  getBuoiId: getBuoiId,
  createBuoi: createBuoi,
  editBuoi: editBuoi,
  deleteBuoi: deleteBuoi,
};
