import giadichvuService from "../services/giadichvuService";

let getAllGiadichvuController = async (req, res) => {
  try {
    let infor = await giadichvuService.getAllGiadichvu();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};
module.exports = {
  getAllGiadichvuController: getAllGiadichvuController,
};
