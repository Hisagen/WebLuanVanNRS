import axios from "../axios";

const getAllNhasxService = () => {
    //template string 
    return axios.get(`/api/get-all-nhasx`);
}

const createNhasxService = (data) => {
    //template string 
    return axios.post('/api/create-nhasx', data);
}

const deleteNhasxService = (id) => {
    //template string 
    return axios.delete('/api/delete-nhasx', {
        data: {
            id: id
        }
    });
}

const editNhasxService = (data) => {
    return axios.put('/api/edit-nhasx', data)
}

export {
    getAllNhasxService,
    createNhasxService,
    deleteNhasxService,
    editNhasxService,
}