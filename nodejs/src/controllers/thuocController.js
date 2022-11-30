import thuocService from "../services/thuocService"

let getAllThuoc = async (req, res) => {
    try {
        let infor = await thuocService.getAllThuocService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getThuocId = async (req, res) => {
    try {
        let infor = await thuocService.getThuocIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let createThuoc= async (req, res) => {
    let message = await thuocService.createThuocService(req.body);
    return res.status(200).json(message);
}

let editThuoc = async (req, res) => {
    let data = req.body;
    let message = await thuocService.editThuocService(data);
    return res.status(200).json(message);
}

let deleteThuoc = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await thuocService.deleteThuocService(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    getAllThuoc: getAllThuoc,
    getThuocId: getThuocId,
    createThuoc: createThuoc,
    editThuoc: editThuoc,
    deleteThuoc: deleteThuoc
}