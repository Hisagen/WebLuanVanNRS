import axios from "../axios";

const getAllChucvuService = () => {
    //template string 
    return axios.get(`/api/get-all-chucvu`);
}

const createChucvuService = (data) => {
    //template string 
    return axios.post('/api/create-chucvu', data);
}

const deleteChucvuService = (id) => {
    //template string 
    return axios.delete('/api/delete-chucvu', {
        data: {
            id: id
        }
    });
}

const editChucvuService = (data) => {
    return axios.put('/api/edit-chucvu', data)
}

export {
    getAllChucvuService,
    createChucvuService,
    deleteChucvuService,
    editChucvuService,
}