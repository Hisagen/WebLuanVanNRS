import axios from "../axios";

const getAllBuoiService = () => {
  //template string
  return axios.get(`/api/get-all-buoi`);
};

const createBuoiService = (data) => {
  //template string
  return axios.post("/api/create-buoi", data);
};

const deleteBuoiService = (id) => {
  //template string
  return axios.delete("/api/delete-buoi", {
    data: {
      id: id,
    },
  });
};

const editBuoiService = (data) => {
  return axios.put("/api/edit-buoi", data);
};

const getIdBuoiService = (id) => {
  //template string
  return axios.get(`/api/get-id-buoi?id=${id}`);
};
export {
  getAllBuoiService,
  createBuoiService,
  deleteBuoiService,
  editBuoiService,
  getIdBuoiService,
};
