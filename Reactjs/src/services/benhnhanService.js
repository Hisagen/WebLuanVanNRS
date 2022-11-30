import axios from "../axios";

const getAllBenhnhanService = () => {
  //template string
  return axios.get(`/api/get-all-benhnhan`);
};

const createBenhnhanService = (data) => {
  //template string
  return axios.post("/api/create-benhnhan", data);
};

const deleteBenhnhanService = (id) => {
  //template string
  return axios.delete("/api/delete-benhnhan", {
    data: {
      id: id,
    },
  });
};

const postPatientBookAppoinment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const editBenhnhanService = (data) => {
  return axios.put("/api/edit-benhnhan", data);
};

const postChidinhAppointment = (data) => {
  return axios.post(`/api/patient-chidinh-appointment`, data);
};

const postBenhNhanPhanHoi = (data) => {
  return axios.post(`/api/benhnhan-phanhoi`, data);
};
const handleBenhnhanLogin = (benhnhanEmail, benhnhanPassword) => {
  return axios.post("/api/login1", {
    email: benhnhanEmail,
    password: benhnhanPassword,
  });
};

const getIdBenhnhanService = (id) => {
  //template string
  return axios.get(`/api/get-id-benhnhan?id=${id}`);
};

const doimatkhauService = (data) => {
  //template string
  return axios.post(`/api/doimatkhau`, data);
};

const checkemailService = (email) => {
  //template string
  return axios.get(`/api/checkemail?email=${email}`);
};

const layMatKhauService = (data) => {
  //template string
  return axios.post(`/api/layMatKhau`, data);
};
export {
  getAllBenhnhanService,
  createBenhnhanService,
  deleteBenhnhanService,
  editBenhnhanService,
  postPatientBookAppoinment,
  postChidinhAppointment,
  handleBenhnhanLogin,
  getIdBenhnhanService,
  postBenhNhanPhanHoi,
  doimatkhauService,
  checkemailService,
  layMatKhauService,
};
