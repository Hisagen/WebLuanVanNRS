import hinhanhphieuchidinhService from "../services/hinhanhphieuchidinhService";

let getHinhAnhPhieuChiDinhController = async (req, res) => {
  try {
    let data = await hinhanhphieuchidinhService.getHinhAnhPhieuChiDinh(
      req.query.id_dangky
    );
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

module.exports = {
  getHinhAnhPhieuChiDinhController: getHinhAnhPhieuChiDinhController,
};
