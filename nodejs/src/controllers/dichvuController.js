import dichvuService from "../services/dichvuService";

let getAllDichVuController = async (req, res) => {
  try {
    let data = await dichvuService.getAllDichVu(req.query.searchValue);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};
module.exports = {
  getAllDichVuController: getAllDichVuController,
};
