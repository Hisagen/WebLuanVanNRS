import axios from "../axios";

const getAllPhieukhamService = () => {
    //template string 
    return axios.get(`/api/get-all-phieukham`);
}

const createPhieukhamService = (data) => {
    //template string 
    return axios.post('/api/create-phieukham', data);
}

const deletePhieukhamService = (id) => {
    //template string 
    return axios.delete('/api/delete-phieukham', {
        data: {
            id: id
        }
    });
}

const editPhieukhamService = (data) => {
    return axios.put('/api/edit-phieukham', data)
}

export {
    getAllPhieukhamService,
    createPhieukhamService,
    deletePhieukhamService,
    editPhieukhamService,
}