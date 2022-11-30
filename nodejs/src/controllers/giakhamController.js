import giakhamService from "../services/giakhamService";

let getAllGiaKham = async (req, res) => {
  try {
    let infor = await giakhamService.getAllGiaKhamService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

module.exports = {
  getAllGiaKham: getAllGiaKham,
};
