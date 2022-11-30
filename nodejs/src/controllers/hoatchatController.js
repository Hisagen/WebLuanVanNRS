import hoatchatService from "../services/hoatchatService"

let getAllHoatchat = async (req, res) => {
    try {
        let infor = await hoatchatService.getAllHoatchatService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getHoatchatId = async (req, res) => {
    try {
        let infor = await hoatchatService.getHoatchatIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let createHoatchat = async (req, res) => {
    let message = await hoatchatService.createHoatchatService(req.body);
    return res.status(200).json(message);
}

let editHoatchat = async (req, res) => {
    let data = req.body;
    let message = await hoatchatService.editHoatchatService(data);
    return res.status(200).json(message);
}

let deleteHoatchat = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await hoatchatService.deleteHoatchatService(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    getAllHoatchat: getAllHoatchat,
    getHoatchatId: getHoatchatId,
    createHoatchat: createHoatchat,
    editHoatchat: editHoatchat,
    deleteHoatchat: deleteHoatchat
}