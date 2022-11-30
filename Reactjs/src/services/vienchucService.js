import axios from "../axios";

const handleLoginApi = (vienchucEmail, vienchucPassword) => {
  return axios.post("/api/login", {
    email: vienchucEmail,
    password: vienchucPassword,
  });
};

const getAllVienchucService = () => {
  return axios.get(`/api/get-all-vienchuc`);
};

const createVienchucService = (data) => {
  return axios.post("/api/create-vienchuc", data);
};

const createImageVienchucService = (file) => {
  return axios.post("/api/create-imagevienchuc", file);
};
const editImageVienchucService = (file) => {
  return axios.put("/api/edit-imagevienchuc", file);
};
const deleteVienchucService = (id) => {
  return axios.delete("/api/delete-vienchuc", {
    data: {
      id: id,
    },
  });
};

const editVienchucService = (data) => {
  return axios.put("/api/edit-vienchuc", data);
};

const getAllTdhvService = () => {
  return axios.get(`/api/get-all-tdhv`);
};

const getAllChucvuService = () => {
  return axios.get(`/api/get-all-chucvu`);
};

const getAllChuyenkhoaService = () => {
  return axios.get(`/api/get-all-chuyenkhoa`);
};

const getAllXaphuongService = () => {
  return axios.get(`/api/get-all-xaphuong`);
};

const getVienchucChuyenkhoaIdService = (id_chuyenkhoa) => {
  return axios.get(
    `/api/get-id-vienchuc-chuyenkhoa?id_chuyenkhoa=${id_chuyenkhoa}`
  );
};
const getVienchucChuyenkhoaIdService1 = (data) => {
  return axios.get(
    `/api/get-id-vienchuc-chuyenkhoa?id_chuyenkhoa=${data.id_chuyenkhoa}`
  );
};
const getVienchucChucvuIdService = (id_chucvu) => {
  return axios.get(`/api/get-id-vienchuc-chucvu?id_chucvu=${id_chucvu}`);
};

const getBacsiIdService = (id) => {
  //template string
  return axios.get(`/api/get-id-bacsi?id=${id}`);
};
export {
  handleLoginApi,
  getAllVienchucService,
  createVienchucService,
  deleteVienchucService,
  editVienchucService,
  getAllChucvuService,
  getAllTdhvService,
  getAllChuyenkhoaService,
  getAllXaphuongService,
  getVienchucChuyenkhoaIdService,
  getVienchucChucvuIdService,
  getBacsiIdService,
  getVienchucChuyenkhoaIdService1,
  createImageVienchucService,
  editImageVienchucService,
};
