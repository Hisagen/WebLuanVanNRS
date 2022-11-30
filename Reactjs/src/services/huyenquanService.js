import axios from "../axios";

const getAllHuyenquanService = () => {
    //template string 
    return axios.get(`/api/get-all-huyenquan`);
}

const createHuyenquanService = (data) => {
    //template string 
    return axios.post('/api/create-huyenquan', data);
}

const deleteHuyenquanService = (id) => {
    //template string 
    return axios.delete('/api/delete-huyenquan', {
        data: {
            id: id
        }
    });
}

const editHuyenquanService = (data) => {
    return axios.put('/api/edit-huyenquan', data)
}

export {
    getAllHuyenquanService,
    createHuyenquanService,
    deleteHuyenquanService,
    editHuyenquanService,
}