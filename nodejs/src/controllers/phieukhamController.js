import phieukhamService from "../services/phieukhamService"

let getAllPhieukham= async (req, res) => {
    try {
        let infor = await phieukhamService.getAllPhieukhamService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}



let createPhieukham = async (req, res) => {
    let message = await phieukhamService.createPhieukhamService(req.body);
    return res.status(200).json(message);
}


let deletePhieukham = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await phieukhamService.deletePhieukhamService(req.body.id);
    return res.status(200).json(message);
}

let editPhieukham = async (req, res) => {
    let data = req.body;
    let message = await phieukhamService.editPhieukhamService(data);
    return res.status(200).json(message);
}

let getPhieukhamId = async (req, res) => {
    try {
        let infor = await phieukhamService.getPhieukhamIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getBenhNhanPhieukhamId = async (req, res) => {
    try {
        let infor = await phieukhamService.getBenhNhanPhieukhamIdService(req.query.id_benhnhan);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getBenhNhanPhieukhamId1 = async (req, res) => {
    try {
        let infor = await phieukhamService.getBenhNhanPhieukhamIdService1(req.query.id_benhnhan);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


module.exports = {
    getAllPhieukham: getAllPhieukham,
    createPhieukham: createPhieukham,
    deletePhieukham: deletePhieukham,
    editPhieukham: editPhieukham,
    getPhieukhamId: getPhieukhamId,
    getBenhNhanPhieukhamId: getBenhNhanPhieukhamId,
    getBenhNhanPhieukhamId1: getBenhNhanPhieukhamId1
}