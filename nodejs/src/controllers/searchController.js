import searchService from "../services/searchService";

let searchAllController = async (req, res) => {
  try {
    let data = await searchService.searchAll();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

let searchLichBacsikhamController = async (req, res) => {
  try {
    let data = await searchService.searchLichBacsikham(req.body.id_vienchuc);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};
module.exports = {
  searchAllController: searchAllController,
  searchLichBacsikhamController: searchLichBacsikhamController,
};
