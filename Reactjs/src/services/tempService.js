import axios from "../axios";

const getAllTempService = () => {
  return axios.get(`/api/get-all-temp`);
};

const createTempService = (data) => {
  return axios.post("/api/create-temp", data);
};

const deleteTempService = (id) => {
  return axios.delete("/api/delete-temp", {
    data: {
      id: id,
    },
  });
};

const editTempService = (data) => {
  return axios.put("/api/edit-temp", data);
};

export {
  getAllTempService,
  createTempService,
  deleteTempService,
  editTempService,
};
