import chuyenkhoaService from "../services/chuyenkhoaService";

let getAllChuyenkhoa = async (req, res) => {
  try {
    let infor = await chuyenkhoaService.getAllChuyenkhoaService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let getChuyenkhoaId = async (req, res) => {
  try {
    let infor = await chuyenkhoaService.getChuyenkhoaIdService(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let createChuyenkhoa = async (req, res) => {
  let message = await chuyenkhoaService.createChuyenkhoaService(req.body);
  return res.status(200).json(message);
};

let editChuyenkhoa = async (req, res) => {
  let data = req.body;
  let message = await chuyenkhoaService.editChuyenkhoaService(data);
  return res.status(200).json(message);
};

let deleteChuyenkhoa = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parament!",
    });
  }
  let message = await chuyenkhoaService.deleteChuyenkhoaService(req.body.id);
  return res.status(200).json(message);
};

let createImageChuyenKhoa = async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  var fs = require("fs");

  let time = Date.now();
  let name = time.toString() + file.name;
  name.toString();

  file.mv(
    `D:/Cac Mon Hoc/Sin/Web mssql/Reactjs/public/Image/ChuyenKhoa/${name}`,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      return res.status(200).json({
        fileName: name,
        filePath: `D:/Cac Mon Hoc/Sin/Web mssql/Reactjs/public/Image/ChuyenKhoa/${name}`,
        errCode: 0,
      });
    }
  );
};
let editImageChuyenKhoa = async (req, res) => {
  if (req.files !== null) {
    // return res.status(400).json({ msg: "No file uploaded" });
    const file = req.files.file;
    var fs = require("fs");

    fs.writeFile(
      `D:/Cac Mon Hoc/Sin/Web mssql/Reactjs/public/Image/ChuyenKhoa/${file.name}`,
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
module.exports = {
  getAllChuyenkhoa: getAllChuyenkhoa,
  getChuyenkhoaId: getChuyenkhoaId,
  createChuyenkhoa: createChuyenkhoa,
  editChuyenkhoa: editChuyenkhoa,
  deleteChuyenkhoa: deleteChuyenkhoa,
  createImageChuyenKhoa: createImageChuyenKhoa,
  editImageChuyenKhoa: editImageChuyenKhoa,
};
