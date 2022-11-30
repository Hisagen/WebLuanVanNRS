import xaphuongService from "../services/xaphuongService"

let getAllXaphuong = async (req, res) => {
    try {
        let infor = await xaphuongService.getAllXaphuongService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getXaphuongId = async (req, res) => {
    try {
        let infor = await xaphuongService.getXaphuongIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let createXaphuong= async (req, res) => {
    let message = await xaphuongService.createXaphuongService(req.body);
    return res.status(200).json(message);
}

let editXaphuong = async (req, res) => {
    let data = req.body;
    let message = await xaphuongService.editXaphuongService(data);
    return res.status(200).json(message);
}

let deleteXaphuong = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await xaphuongService.deleteXaphuongService(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    getAllXaphuong: getAllXaphuong,
    getXaphuongId: getXaphuongId,
    createXaphuong: createXaphuong,
    editXaphuong: editXaphuong,
    deleteXaphuong: deleteXaphuong
}