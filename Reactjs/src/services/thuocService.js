import axios from "../axios";

const getAllThuocService = () => {
    //template string 
    return axios.get(`/api/get-all-thuoc`);
}

const createThuocService = (data) => {
    //template string 
    return axios.post('/api/create-thuoc', data);
}

const deleteThuocService = (id) => {
    //template string 
    return axios.delete('/api/delete-thuoc', {
        data: {
            id: id
        }
    });
}

const editThuocService = (data) => {
    return axios.put('/api/edit-thuoc', data)
}

export {
    getAllThuocService,
    createThuocService,
    deleteThuocService,
    editThuocService,
}