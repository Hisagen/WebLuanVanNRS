import axios from "../axios";

const getAllTinhthanhService = () => {
    //template string 
    return axios.get(`/api/get-all-tinhthanh`);
}

const createTinhthanhService = (data) => {
    //template string 
    return axios.post('/api/create-tinhthanh', data);
}

const deleteTinhthanhService = (id) => {
    //template string 
    return axios.delete('/api/delete-tinhthanh', {
        data: {
            id: id
        }
    });
}

const editTinhthanhService = (data) => {
    return axios.put('/api/edit-tinhthanh', data)
}

export {
    getAllTinhthanhService,
    createTinhthanhService,
    deleteTinhthanhService,
    editTinhthanhService,
}