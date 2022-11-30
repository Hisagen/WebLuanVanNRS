import axios from "../axios";

const getAllLichkhamService = () => {
    //template string 
    return axios.get(`/api/get-all-lichkham`);
}

const createLichkhamService = (data) => {
    //template string 
    return axios.post('/api/create-lichkham', data);
}

const deleteLichkhamService = (id) => {
    //template string 
    return axios.delete('/api/delete-lichkham', {
        data: {
            id: id
        }
    });
}

const editLichkhamService = (data) => {
    return axios.put('/api/edit-lichkham', data)
}

export {
    getAllLichkhamService,
    createLichkhamService,
    deleteLichkhamService,
    editLichkhamService,
}