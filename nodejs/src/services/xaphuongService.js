import db from "../models/index"
require('dotenv').config();

let getAllXaphuongService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let xaphuongs = await db.xaphuongs.findAll({
                include: [
                    {
                        model: db.huyenquans, as: 'xaphuonghuyenquan',
                        include: [
                            { model: db.tinhthanhs, as: 'huyenquantinhthanh' },

                        ],
                    },

                ],
                raw: false,
                nest: true
            })
            resolve({
                errCode: 0,
                data: xaphuongs
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createXaphuongService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.tenxaphuong) {
                resolve({
                    errCode: 1,
                    errmessage: "chua truyen xa phuong"
                });
            } else {
                await db.xaphuongs.create({
                    tenxaphuong: data.tenxaphuong,
                    id_huyenquan: data.id_huyenquan,
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

let deleteXaphuongService = (id) => {
    return new Promise(async (resolve, reject) => {
        let foundXaphuong = await db.xaphuongs.findOne({
            where: { id: id }
        })
        if (!foundXaphuong) {
            resolve({
                errCode: 2,
                errMessage: `khong tim thay xa phuong`
            })
        }
        await db.xaphuongs.destroy({
            where: { id: id }
        });
        resolve({
            errCode: 0,
            errMessage: `xa phuong da duoc xoa`
        })
    })
}

let getXaphuongIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'chua truyen xa phuong!'
                })
            } else {
                let data = await db.xaphuongs.findOne({
                    where: {
                        id: id,
                        include: [
                            {
                                model: db.huyenquans, as: 'xaphuonghuyenquan',
                                include: [
                                    { model: db.tinhthanhs, as: 'huyenquantinhthanh' },

                                ],
                            },

                        ],
                    },
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

let editXaphuongService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id && !data.tenxaphuong) {
                resolve({
                    errCode: 2,
                    errMessage: 'chua truyen xa phuong'
                })
            }
            let xaphuong = await db.xaphuongs.findOne({
                where: { id: data.id },
                raw: false
            });
            if (xaphuong) {
                xaphuong.tenxaphuong = data.tenxaphuong;
                xaphuong.id_huyenquan = data.id_huyenquan;
                await xaphuong.save();

                resolve({
                    errCode: 0,
                    message: 'cap nhat xa phuong thanh cong'
                });

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'xa phuong bi rong'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllXaphuongService: getAllXaphuongService,
    getXaphuongIdService: getXaphuongIdService,
    createXaphuongService: createXaphuongService,
    editXaphuongService: editXaphuongService,
    deleteXaphuongService: deleteXaphuongService
}   