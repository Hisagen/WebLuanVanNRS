import giathuocService from "../services/giathuocService";

let getAllGiaThuoc = async (req, res) => {
  try {
    let infor = await giathuocService.getAllGiaThuocService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

module.exports = {
  getAllGiaThuoc: getAllGiaThuoc,
};
