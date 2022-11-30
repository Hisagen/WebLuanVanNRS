import axios from "../axios";

const getAllLichbacsikhamService = () => {
  //template string
  return axios.get(`/api/get-all-lichbacsikham`);
};

// const createLichbacsikhamService = (data) => {
//     //template string
//     return axios.post('/api/create-lichbacsikham', data);
// }

const deleteLichbacsikhamService = (id) => {
  //template string
  return axios.delete("/api/delete-lichbacsikham", {
    data: {
      id: id,
    },
  });
};

const editLichbacsikhamService = (data) => {
  return axios.put("/api/edit-lichbacsikham", data);
};

const bulkCreateScheduele = (data) => {
  //template string
  return axios.post("/api/bulk-create-schedule", data);
};

const getBacsiLichbacsikhamIdService = (id_vienchuc) => {
  //template string
  return axios.get(
    `/api/get-id-bacsi-lichbacsikham?id_vienchuc=${id_vienchuc}`
  );
};

const getNgayBacsiLichbacsikhamIdService = (id_vienchuc, ngay) => {
  //template string
  return axios.get(
    `/api/get-id-ngay-lichbacsikham?id_vienchuc=${id_vienchuc}&ngay=${ngay}`
  );
};

const getAllChuyenkhoaLichbacsikhamService = (id_chuyenkhoa) => {
  //template string
  return axios.get(
    `/api/get-chuyenkhoa-all-lichbacsikham?id_chuyenkhoa=${id_chuyenkhoa}`
  );
};

const countDangky = (id_lichkham) => {
  return axios.post("/api/count-dangky", { id_lichkham: id_lichkham });
};

const getlichbacsikhamtheoid = (id) => {
  return axios.get(`/api/get-id-lichbacsikham?id=${id}`);
};

const kiemtraixoasuaLBSK = (id_lichbacsikham) => {
  return axios.post("/api/kiemtra-xaosua-lichbacsikham", {
    id_lichbacsikham: id_lichbacsikham,
  });
};

export {
  getAllLichbacsikhamService,
  // createLichbacsikhamService,
  deleteLichbacsikhamService,
  editLichbacsikhamService,
  bulkCreateScheduele,
  getBacsiLichbacsikhamIdService,
  getNgayBacsiLichbacsikhamIdService,
  getAllChuyenkhoaLichbacsikhamService,
  countDangky,
  getlichbacsikhamtheoid,
  kiemtraixoasuaLBSK,
};
