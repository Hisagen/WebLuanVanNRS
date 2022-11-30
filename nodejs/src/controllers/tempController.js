import tempService from "../services/tempService"

let getAllTemp= async (req, res) => {
    try {
        let infor = await tempService.getAllTempService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}



let createTemp = async (req, res) => {
    let message = await tempService.createTempService(req.body);
    return res.status(200).json(message);
}


let deleteTemp = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await tempService.deleteTempService(req.body.id);
    return res.status(200).json(message);
}

let editTemp = async (req, res) => {
    let data = req.body;
    let message = await tempService.editTempService(data);
    return res.status(200).json(message);
}

let getTempId = async (req, res) => {
    try {
        let infor = await tempService.getTempIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

module.exports = {
    getAllTemp: getAllTemp,
    createTemp: createTemp,
    deleteTemp: deleteTemp,
    editTemp: editTemp,
    getTempId: getTempId
}