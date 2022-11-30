import chidinhService from "../services/chidinhService"

let getAllChidinh = async (req, res) => {
    try {
        let infor = await chidinhService.getAllChidinhService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let bulkCreateChidinh = async (req, res) => {
    try {
        let infor = await chidinhService.bulkCreateChidinh(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let createChidinh = async (req, res) => {
    let message = await chidinhService.createChidinhService(req.body);
    return res.status(200).json(message);
}


let deleteChidinh = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await chidinhService.deleteChidinhService(req.body.id);
    return res.status(200).json(message);
}

let editChidinh = async (req, res) => {
    let data = req.body;
    let message = await chidinhService.editChidinhService(data);
    return res.status(200).json(message);
}

let getChidinhId = async (req, res) => {
    try {
        let infor = await chidinhService.getChidinhIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getDangkyChidinhId = async (req, res) => {
    try {
        let infor = await chidinhService.getDangkyChidinhIdService(req.query.id_dangky);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getDangkyChidinhId1 = async (req, res) => {
    try {
        let infor = await chidinhService.getDangkyChidinhIdService1(req.query.id_dangky);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let getBenhNhanChidinhId = async (req, res) => {
    try {
        let infor = await chidinhService.getBenhNhanChidinhIdService(req.query.id_benhnhan);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getBenhNhanChidinhId1 = async (req, res) => {
    try {
        let infor = await chidinhService.getBenhNhanChidinhIdService1(req.query.id_benhnhan);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getPhieuKhamChidinhId = async (req, res) => {
    try {
        let infor = await chidinhService.getPhieuKhamChidinhIdService(req.query.id_phieukham);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

module.exports = {
    getAllChidinh: getAllChidinh,
    createChidinh: createChidinh,
    deleteChidinh: deleteChidinh,
    editChidinh: editChidinh,
    getChidinhId: getChidinhId,
    bulkCreateChidinh: bulkCreateChidinh,
    getDangkyChidinhId: getDangkyChidinhId,
    getDangkyChidinhId1: getDangkyChidinhId1,
    getBenhNhanChidinhId: getBenhNhanChidinhId,
    getBenhNhanChidinhId1: getBenhNhanChidinhId1,
    getPhieuKhamChidinhId: getPhieuKhamChidinhId
}