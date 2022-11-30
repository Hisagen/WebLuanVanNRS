import axios from "../axios";

const getAllChidinhService = () => {
    //template string 
    return axios.get(`/api/get-all-chidinh`);
}

const createChidinhService = (data) => {
    //template string 
    return axios.post('/api/create-chidinh', data);
}

const deleteChidinhService = (id) => {
    //template string 
    return axios.delete('/api/delete-chidinh', {
        data: {
            id: id
        }
    });
}

const editChidinhService = (data) => {
    return axios.put('/api/edit-chidinh', data)
}

const bulkCreateChidinh = (data) => {
    return axios.post('/api/bulk-create-chidinh', data)
}

const getDangkyChidinhIdService = (id_dangky) => {
    //template string 
    return axios.get(`/api/get-id-dangky-chidinh?id_dangky=${id_dangky}`);
}

const getDangkyChidinhIdService1 = (id_dangky) => {
    //template string 
    return axios.get(`/api/get-id-dangky-chidinh1?id_dangky=${id_dangky}`);
}

const getBenhNhanChidinhIdService = (id_benhnhan) => {
    //template string 
    return axios.get(`/api/get-id-benhnhan-chidinh?id_benhnhan=${id_benhnhan}`);
}

const getBenhNhanChidinhIdService1 = (id_benhnhan) => {
    //template string 
    return axios.get(`/api/get-id-benhnhan-chidinh1?id_benhnhan=${id_benhnhan}`);
}

const getBenhNhanPhieukhamIdService = (id_benhnhan) => {
    //template string 
    return axios.get(`/api/get-id-benhnhan-phieukham?id_benhnhan=${id_benhnhan}`);
}

const getBenhNhanPhieukhamIdService1 = (id_benhnhan) => {
    //template string 
    return axios.get(`/api/get-id-benhnhan-phieukham1?id_benhnhan=${id_benhnhan}`);
}

const getPhieuKhamChidinhIdService = (id_phieukham) => {
    //template string 
    return axios.get(`/api/get-id-phieukham-chidinh?id_phieukham=${id_phieukham
}`);
}



export {
    getAllChidinhService,
    createChidinhService,
    deleteChidinhService,
    editChidinhService,
    bulkCreateChidinh,
    getDangkyChidinhIdService,
    getDangkyChidinhIdService1,
    getBenhNhanChidinhIdService,
    getBenhNhanChidinhIdService1,

    getBenhNhanPhieukhamIdService,
    getBenhNhanPhieukhamIdService1, 
    getPhieuKhamChidinhIdService
}