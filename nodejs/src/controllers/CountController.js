import CountService from "../services/CountService";
let demsoluongdangkyController = async (req, res) => {
  try {
    let infor = await CountService.demsoluongdangky(req.body.id_vienchuc);
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};
module.exports = {
  demsoluongdangkyController: demsoluongdangkyController,
};
