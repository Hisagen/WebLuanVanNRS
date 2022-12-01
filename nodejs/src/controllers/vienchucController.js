import vienchucService from "../services/vienchucService";
let formidable = require("formidable");
import multer from "multer";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parament",
    });
  }

  let vienchucData = await vienchucService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: vienchucData.errCode,
    message: vienchucData.errMessage,
    vienchuc: vienchucData.vienchuc ? vienchucData.vienchuc : {},
  });
};

let getAllVienchuc = async (req, res) => {
  try {
    let infor = await vienchucService.getAllVienchucService();
    // return res.status(200).json("test");
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getVienchucId = async (req, res) => {
  try {
    let infor = await vienchucService.getVienchucIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getVienchucChucvuId = async (req, res) => {
  try {
    let infor = await vienchucService.getVienchucChucvuIdService(
      req.query.id_chucvu
    );
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getVienchucChuyenkhoaId = async (req, res) => {
  try {
    let infor = await vienchucService.getVienchucChuyenkhoaIdService(
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

let createVienchuc = async (req, res) => {
  let message = await vienchucService.createVienchucService(req.body);

  return res.status(200).json(message);
};
let createImageVienchuc = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  var fs = require("fs");

  let time = Date.now();
  let name = time.toString() + file.name;
  name.toString();

  file.mv(
    `D:/Cac Mon Hoc/Sin/Web mssql/Reactjs/public/Image/ChucVu/${name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      return res.status(200).json({
        fileName: name,
        filePath: `D:/Cac Mon Hoc/Sin/Web mssql/Reactjs/public/Image/ChucVu/${name}`,
        errCode: 0,
      });
    }
  );
};

let editVienchuc = async (req, res) => {
  let data = req.body;
  let message = await vienchucService.editVienchucService(data);
  return res.status(200).json(message);
};

let editImageVienchuc = async (req, res) => {
  if (req.files !== null) {
    const file = req.files.file;
    var fs = require("fs");

    fs.writeFile(
      `D:/Cac Mon Hoc/Sin/Web mssql/Reactjs/public/Image/ChucVu/${file.name}`,
      file.data,
      function (err) {
        err || console.log("Data replaced \n");
      }
    );
    return res.status(200).json({
      errCode: 0,
      errMessage: "success!",
    });
  }
  return res.status(200).json({
    errCode: 0,
    errMessage: "success!",
  });
};

let deleteVienchuc = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parament!",
    });
  }
  let message = await vienchucService.deleteVienchucService(req.body.id);
  return res.status(200).json(message);
};

let getBacsiId = async (req, res) => {
  try {
    let infor = await vienchucService.getBacsiIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

const upload = multer().single("profile_pic");

module.exports = {
  getAllVienchuc: getAllVienchuc,
  getVienchucId: getVienchucId,
  createVienchuc: createVienchuc,
  editVienchuc: editVienchuc,
  deleteVienchuc: deleteVienchuc,
  handleLogin: handleLogin,
  getVienchucChucvuId: getVienchucChucvuId,
  getVienchucChuyenkhoaId: getVienchucChuyenkhoaId,
  getBacsiId: getBacsiId,
  createImageVienchuc: createImageVienchuc,
  editImageVienchuc: editImageVienchuc,
};
