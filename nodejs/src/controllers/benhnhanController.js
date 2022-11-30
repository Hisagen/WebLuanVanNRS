import benhnhanService from "../services/benhnhanService";
const twilio = require("twilio");
let getAllBenhnhan = async (req, res) => {
  try {
    let infor = await benhnhanService.getAllBenhnhanService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getBenhnhanId = async (req, res) => {
  try {
    let infor = await benhnhanService.getBenhnhanIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let createBenhnhan = async (req, res) => {
  let message = await benhnhanService.createBenhnhanService(req.body);
  return res.status(200).json(message);
};

let editBenhnhan = async (req, res) => {
  let data = req.body;
  let message = await benhnhanService.editBenhnhanService(data);
  return res.status(200).json(message);
};

let deleteBenhnhan = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parament!",
    });
  }
  let message = await benhnhanService.deleteBenhnhanService(req.body.id);
  return res.status(200).json(message);
};

let postBookAppointment = async (req, res) => {
  try {
    let infor = await benhnhanService.postBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let BenhNhanPhanHoiController = async (req, res) => {
  try {
    let infor = await benhnhanService.BenhNhanPhanHoiService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let postChidinhAppointment = async (req, res) => {
  try {
    let infor = await benhnhanService.postChidinhAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let handleBenhnhanLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parament",
    });
  }

  let benhnhanData = await benhnhanService.handleBenhnhanLogin(email, password);

  return res.status(200).json({
    errCode: 0,
    benhnhanData,
  });
};

let DoiMatKhauController = async (req, res) => {
  try {
    let infor = await benhnhanService.DoiMatKhauService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let checkBenhnhanEmailController = async (req, res) => {
  try {
    let infor = await benhnhanService.checkBenhnhanEmail(req.query);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let LayMatKhauController = async (req, res) => {
  try {
    let infor = await benhnhanService.LayMatKhauService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let testbenhnhan = async (req, res) => {
  try {
    let data = await benhnhanService.testbenhnhanservice(req.query);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let guisms = async (req, res) => {
  try {
    let accountSid = "ACd05340b5b9adf803b8e8e880217acaad";
    let authToken = "0e2b3841e40cb7e1554fcf9274305b37";
    const client = require("twilio")(accountSid, authToken);
    let test = client.messages.create({
      to: "+84794234003",
      from: "+84393349814",
      body: "Chúc Mừng Bạn Đã Trúng Tuyển Nghĩa Vụ Quân Sự",
    });
    res.status(200).json(test);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

module.exports = {
  getAllBenhnhan: getAllBenhnhan,
  getBenhnhanId: getBenhnhanId,
  createBenhnhan: createBenhnhan,
  editBenhnhan: editBenhnhan,
  deleteBenhnhan: deleteBenhnhan,
  postBookAppointment: postBookAppointment,
  postChidinhAppointment: postChidinhAppointment,
  handleBenhnhanLogin: handleBenhnhanLogin,
  BenhNhanPhanHoiController: BenhNhanPhanHoiController,
  DoiMatKhauController: DoiMatKhauController,
  checkBenhnhanEmailController: checkBenhnhanEmailController,
  LayMatKhauController: LayMatKhauController,
  testbenhnhan: testbenhnhan,
  guisms: guisms,
};
