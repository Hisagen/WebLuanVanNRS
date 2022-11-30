import axios from "../axios";

const getAllDangkyService = () => {
  //template string
  return axios.get(`/api/get-all-dangky`);
};

const createDangkyService = (data) => {
  //template string
  return axios.post("/api/create-dangky", data);
};

const deleteDangkyService = (id) => {
  //template string
  return axios.delete("/api/delete-dangky", {
    data: {
      id: id,
    },
  });
};

const editDangkyService = (data) => {
  return axios.put("/api/edit-dangky", data);
};

const getBacsiDangkyIdService = (data) => {
  return axios.get(
    `/api/get-id-bacsi-dangky?id_vienchuc=${data.id_vienchuc}&ngay=${data.ngay}`
  );
};
const getBacsiOneDangkyIdService = (data) => {
  return axios.get(
    `/api/get-id-one-bacsi-dangky?id_vienchuc=${data.id_vienchuc}&ngay=${data.ngay}`
  );
};
const getVienchucDangkyIdService = (data) => {
  return axios.get(
    `/api/get-id-vienchuc-dangky?id_vienchuc=${data.id_vienchuc}`
  );
};
const getBenhNhanDangkyIdService = (id) => {
  return axios.get(`/api/get-id-dangky-benhnhan?id=${id}`);
};

const checkDangKy = (data) => {
  return axios.post(`/api/check-dangky`, data);
};
export {
  getAllDangkyService,
  createDangkyService,
  deleteDangkyService,
  editDangkyService,
  getBacsiDangkyIdService,
  getBacsiOneDangkyIdService,
  getVienchucDangkyIdService,
  getBenhNhanDangkyIdService,
  checkDangKy,
};
