import axios from "../axios";

const getHinhAnhChiDinhIdDangKyService = (id_dangky) => {
  //template string
  return axios.get(`/api/get-hinhanh-pcd-id-dang-ky?id_dangky=${id_dangky}`);
};

export { getHinhAnhChiDinhIdDangKyService };
