import chucvuService from "../services/chucvuService"

let getAllChucvu = async (req, res) => {
    try {
        let infor = await chucvuService.getAllChucvuService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getChucvuId = async (req, res) => {
    try {
        let infor = await chucvuService.getChucvuIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let createChucvu = async (req, res) => {
    let message = await chucvuService.createChucvuService(req.body);
    return res.status(200).json(message);
}

let editChucvu = async (req, res) => {
    let data = req.body;
    let message = await chucvuService.editChucvuService(data);
    return res.status(200).json(message);
}

let deleteChucvu = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await chucvuService.deleteChucvuService(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    getAllChucvu: getAllChucvu,
    getChucvuId: getChucvuId,
    createChucvu: createChucvu,
    editChucvu: editChucvu,
    deleteChucvu: deleteChucvu
}