import lichkhamService from "../services/lichkhamService"

let getAllLichkham= async (req, res) => {
    try {
        let infor = await lichkhamService.getAllLichkhamService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getLichkhamId = async (req, res) => {
    try {
        let infor = await lichkhamService.getLichkhamIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let createLichkham= async (req, res) => {
    let message = await lichkhamService.createLichkhamService(req.body);
    return res.status(200).json(message);
}

let editLichkham = async (req, res) => {
    let data = req.body;
    let message = await lichkhamService.editService(data);
    return res.status(200).json(message);
}

let deleteLichkham = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await lichkhamService.deleteLichkhamService(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    getAllLichkham: getAllLichkham,
    getLichkhamId: getLichkhamId,
    createLichkham: createLichkham,
    editLichkham: editLichkham,
    deleteLichkham: deleteLichkham
}