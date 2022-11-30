import axios from "../axios";
const getAllDichVu = (searchValue) => {
  return axios.get(`/api/get-all-dichvu?searchValue=${searchValue}`);
};
export { getAllDichVu };
