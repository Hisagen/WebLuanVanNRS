import axios from "../axios";

const getAllPhongService = () => {
  //template string
  return axios.get(`/api/get-all-phong`);
};

const createPhongService = (data) => {
  //template string
  return axios.post("/api/create-phong", data);
};

const deletePhongService = (id) => {
  //template string
  return axios.delete("/api/delete-phong", {
    data: {
      id: id,
    },
  });
};

const editPhongService = (data) => {
  return axios.put("/api/edit-phong", data);
};

const getPhongChuyenkhoaIdService = (
  id_chuyenkhoa,
  date_choose,
  nameDoctor,
  phong_choose
) => {
  return axios.get(
    `/api/get-id-phong-chuyenkhoa?id_chuyenkhoa=${id_chuyenkhoa}&date_choose=${date_choose}&nameDoctor=${nameDoctor}&phong_choose=${phong_choose}`
  );
};

const getOnePhongChuyenkhoaIdService = (id) => {
  return axios.get(`/api/get-id-phong?id=${id}`);
};

export {
  getAllPhongService,
  createPhongService,
  deletePhongService,
  editPhongService,
  getPhongChuyenkhoaIdService,
  getOnePhongChuyenkhoaIdService,
};
