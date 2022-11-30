import db from "../models/index"
require('dotenv').config();

let getAllHuyenquanService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let huyenquans = await db.huyenquans.findAll({
                include: [
                    { model: db.tinhthanhs, as: 'huyenquantinhthanh' },
                ],
                raw: false,
                nest: true
            })
            resolve({
                errCode: 0,
                data: huyenquans
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createHuyenquanService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.tenhuyenquan) {
                resolve({
                    errCode: 1,
                    errmessage: "chua truyen huyen quan"
                });
            } else {
                await db.huyenquans.create({
                    tenhuyenquan: data.tenhuyenquan,
                    id_tinhthanh: data.id_tinhthanh,
                })
            }
            resolve({
                errCode: 0,
                message: "ok"
            });
        } catch (e) {
            reject(e);
        }
    })
}

let deleteHuyenquanService = (id) => {
    return new Promise(async (resolve, reject) => {
        let foundHuyenquan = await db.huyenquans.findOne({
            where: { id: id }
        })
        if (!foundHuyenquan) {
            resolve({
                errCode: 2,
                errMessage: `khong tim thay huyen quan`
            })
        }
        await db.huyenquans.destroy({
            where: { id: id }
        });
        resolve({
            errCode: 0,
            errMessage: `huyen quan da duoc xoa`
        })
    })
}

let getHuyenquanIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'chua truyen huyen quan!'
                })
            } else {
                let data = await db.huyenquans.findOne({
                    where: {
                        id: id,
                    },
                    include: [
                        { model: db.tinhthanhs, as: 'huyenquantinhthanh', attributes: ['tentinhthanh'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) data = {}
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let editHuyenquanService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id && !data.tenhuyenquan) {
                resolve({
                    errCode: 2,
                    errMessage: 'chua truyen huyen quan'
                })
            }
            let huyenquan = await db.huyenquans.findOne({
                where: { id: data.id },
                raw: false
            });
            if (huyenquan) {
                huyenquan.tenhuyenquan = data.tenhuyenquan,
                huyenquan.id_tinhthanh = data.id_tinhthanh,
                await huyenquan.save();

                resolve({
                    errCode: 0,
                    message: 'cap nhat huyen quan thanh cong'
                });

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'huyen quan bi rong'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllHuyenquanService: getAllHuyenquanService,
    getHuyenquanIdService: getHuyenquanIdService,
    createHuyenquanService: createHuyenquanService,
    editHuyenquanService: editHuyenquanService,
    deleteHuyenquanService: deleteHuyenquanService
}   