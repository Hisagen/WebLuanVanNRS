import axios from "../axios";

const getAllXaphuongService = () => {
    //template string 
    return axios.get(`/api/get-all-xaphuong`);
}

const createXaphuongService = (data) => {
    //template string 
    return axios.post('/api/create-xaphuong', data);
}

const deleteXaphuongService = (id) => {
    //template string 
    return axios.delete('/api/delete-xaphuong', {
        data: {
            id: id
        }
    });
}

const editXaphuongService = (data) => {
    return axios.put('/api/edit-xaphuong', data)
}

export {
    getAllXaphuongService,
    createXaphuongService,
    deleteXaphuongService,
    editXaphuongService,
}