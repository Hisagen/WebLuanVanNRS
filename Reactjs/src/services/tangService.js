import axios from "../axios";

const getAllTangService = () => {
  //template string
  return axios.get(`/api/get-all-tang`);
};

const createTangService = (data) => {
  return axios.post("/api/create-tang", data);
};

const deleteTangService = (id) => {
  //template string
  return axios.delete("/api/delete-tang", {
    data: {
      id: id,
    },
  });
};

const editTangService = (data) => {
  return axios.put("/api/edit-tang", data);
};

const getTangChuyenkhoaIdService = (
  id_chuyenkhoa,
  date_choose,
  nameDoctor,
  tang_choose
) => {
  return axios.get(
    `/api/get-id-tang-chuyenkhoa?id_chuyenkhoa=${id_chuyenkhoa}&date_choose=${date_choose}&nameDoctor=${nameDoctor}&tang_choose=${tang_choose}`
  );
};

const getOneTangChuyenkhoaIdService = (id) => {
  return axios.get(`/api/get-id-tang?id=${id}`);
};

export {
  getAllTangService,
  createTangService,
  deleteTangService,
  editTangService,
  getTangChuyenkhoaIdService,
  getOneTangChuyenkhoaIdService,
};
