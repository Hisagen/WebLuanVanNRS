import nhasxService from "../services/nhasxService"

let getAllNhasx = async (req, res) => {
    try {
        let infor = await nhasxService.getAllNhasxService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getNhasxId = async (req, res) => {
    try {
        let infor = await nhasxService.getNhasxIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let createNhasx = async (req, res) => {
    let message = await nhasxService.createNhasxService(req.body);
    return res.status(200).json(message);
}

let editNhasx = async (req, res) => {
    let data = req.body;
    let message = await nhasxService.editNhasxService(data);
    return res.status(200).json(message);
}

let deleteNhasx = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await nhasxService.deleteNhasxService(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    getAllNhasx: getAllNhasx,
    getNhasxId: getNhasxId,
    createNhasx: createNhasx,
    editNhasx: editNhasx,
    deleteNhasx: deleteNhasx
}