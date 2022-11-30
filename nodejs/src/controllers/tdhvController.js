import tdhvService from "../services/tdhvService"

let getAllTdhv = async (req, res) => {
    try {
        let infor = await tdhvService.getAllTdhvService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getTdhvId = async (req, res) => {
    try {
        let infor = await tdhvService.getTdhvIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let createTdhv = async (req, res) => {
    let message = await tdhvService.createTdhvService(req.body);
    return res.status(200).json(message);
}

let editTdhv = async (req, res) => {
    let data = req.body;
    let message = await tdhvService.editTdhvService(data);
    return res.status(200).json(message);
}

let deleteTdhv = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await tdhvService.deleteTdhvService(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    getAllTdhv: getAllTdhv,
    getTdhvId: getTdhvId,
    createTdhv: createTdhv,
    editTdhv: editTdhv,
    deleteTdhv: deleteTdhv
}