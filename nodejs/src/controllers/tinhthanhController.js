import tinhthanhService from "../services/tinhthanhService"

let getAllTinhthanh = async (req, res) => {
    try {
        let infor = await tinhthanhService.getAllTinhthanhService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getTinhthanhId = async (req, res) => {
    try {
        let infor = await tinhthanhService.getTinhthanhIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let createTinhthanh= async (req, res) => {
    let message = await tinhthanhService.createTinhthanhService(req.body);
    return res.status(200).json(message);
}

let editTinhthanh = async (req, res) => {
    let data = req.body;
    let message = await tinhthanhService.editTinhthanhService(data);
    return res.status(200).json(message);
}

let deleteTinhthanh = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await tinhthanhService.deleteTinhthanhService(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    getAllTinhthanh: getAllTinhthanh,
    getTinhthanhId: getTinhthanhId,
    createTinhthanh: createTinhthanh,
    editTinhthanh: editTinhthanh,
    deleteTinhthanh: deleteTinhthanh
}