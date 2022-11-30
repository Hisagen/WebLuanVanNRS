import phuongthucthanhtoanService from "../services/phuongthucthanhtoanService";

let getAllPhuongthucthanhtoan = async (req, res) => {
  try {
    let infor =
      await phuongthucthanhtoanService.getAllPhuongthucthanhtoanService();
    return res.status(200).json(infor);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server...",
    });
  }
};

module.exports = {
  getAllPhuongthucthanhtoan: getAllPhuongthucthanhtoan,
};
