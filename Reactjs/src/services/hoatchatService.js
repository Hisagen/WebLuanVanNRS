import axios from "../axios";

const getAllHoatchatService = () => {
    //template string 
    return axios.get(`/api/get-all-hoatchat`);
}

const createHoatchatService = (data) => {
    //template string 
    return axios.post('/api/create-hoatchat', data);
}

const deleteHoatchatService = (id) => {
    //template string 
    return axios.delete('/api/delete-hoatchat', {
        data: {
            id: id
        }
    });
}

const editHoatchatService = (data) => {
    return axios.put('/api/edit-hoatchat', data)
}

export {
    getAllHoatchatService,
    createHoatchatService,
    deleteHoatchatService,
    editHoatchatService,
}