import huyenquanService from "../services/huyenquanService"

let getAllHuyenquan = async (req, res) => {
    try {
        let infor = await huyenquanService.getAllHuyenquanService();
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}

let getHuyenquanId = async (req, res) => {
    try {
        let infor = await huyenquanService.getHuyenquanIdService(req.query.id);
        return res.status(200).json(infor);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server...'
        })
    }
}


let createHuyenquan= async (req, res) => {
    let message = await huyenquanService.createHuyenquanService(req.body);
    return res.status(200).json(message);
}

let editHuyenquan = async (req, res) => {
    let data = req.body;
    let message = await huyenquanService.editHuyenquanService(data);
    return res.status(200).json(message);
}

let deleteHuyenquan = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parament!"
        })
    }
    let message = await huyenquanService.deleteHuyenquanService(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    getAllHuyenquan: getAllHuyenquan,
    getHuyenquanId: getHuyenquanId,
    createHuyenquan: createHuyenquan,
    editHuyenquan: editHuyenquan,
    deleteHuyenquan: deleteHuyenquan
}