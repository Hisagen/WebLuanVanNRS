import axios from "../axios";

const getAllTdhvService = () => {
    //template string 
    return axios.get(`/api/get-all-tdhv`);
}

const createTdhvService = (data) => {
    //template string 
    return axios.post('/api/create-tdhv', data);
}

const deleteTdhvService = (id) => {
    //template string 
    return axios.delete('/api/delete-tdhv', {
        data: {
            id: id
        }
    });
}

const editTdhvService = (data) => {
    return axios.put('/api/edit-tdhv', data)
}

export {
    getAllTdhvService,
    createTdhvService,
    deleteTdhvService,
    editTdhvService,
}