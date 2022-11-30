import axios from "../axios";

const searchAll = () => {
  return axios.post(`/api/search-all`);
};
export { searchAll };
