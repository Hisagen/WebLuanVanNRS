import axios from "../axios";

const getAllChuyenkhoaService = () => {
  //template string
  return axios.get(`/api/get-all-chuyenkhoa`);
};

const createChuyenkhoaService = (data) => {
  //template string
  return axios.post("/api/create-chuyenkhoa", data);
};
const createImageChuyenkhoaService = (file) => {
  return axios.post("/api/create-imagechuyenkhoa", file);
};
const editImageChuyenkhoaService = (file) => {
  return axios.put("/api/edit-imagechuyenkhoa", file);
};
const deleteChuyenkhoaService = (id) => {
  //template string
  return axios.delete("/api/delete-chuyenkhoa", {
    data: {
      id: id,
    },
  });
};

const editChuyenkhoaService = (data) => {
  return axios.put("/api/edit-chuyenkhoa", data);
};
const getChuyenkhoaIdService = (data) => {
  return axios.get(`/api/get-id-chuyenkhoa?id=${data.id}`);
};

export {
  getAllChuyenkhoaService,
  createChuyenkhoaService,
  deleteChuyenkhoaService,
  editChuyenkhoaService,
  getChuyenkhoaIdService,
  createImageChuyenkhoaService,
  editImageChuyenkhoaService,
};
