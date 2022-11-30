import axios from "../axios";

const countDangKyTheoBacSi = (id_vienchuc) => {
  return axios.post("/api/count-dang-ky-bac-si", { id_vienchuc: id_vienchuc });
};

export { countDangKyTheoBacSi };
