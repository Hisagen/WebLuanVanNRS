import db from "../models/index"
require('dotenv').config();

let getAllTinhthanhService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let tinhthanhs = await db.tinhthanhs.findAll()
            resolve({
                errCode: 0,
                data: tinhthanhs
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createTinhthanhService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.tentinhthanh) {
                resolve({
                    errCode: 1,
                    errmessage: "chua truyen tinh thanh"
                });
            } else {
                await db.tinhthanhs.create({
                    tentinhthanh: data.tentinhthanh,
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

let deleteTinhthanhService = (id) => {
    return new Promise(async (resolve, reject) => {
        let foundTinhthanh = await db.tinhthanhs.findOne({
            where: { id: id }
        })
        if (!foundTinhthanh) {
            resolve({
                errCode: 2,
                errMessage: `khong tim thay tinh thanh`
            })
        }
        await db.tinhthanhs.destroy({
            where: { id: id }
        });
        resolve({
            errCode: 0,
            errMessage: `tinh thanh da duoc xoa`
        })
    })
}

let getTinhthanhIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'chua truyen tinh thanh!'
                })
            } else {
                let data = await db.tinhthanhs.findOne({
                    where: {
                        id: id,
                        include: [
                            {
                                model: db.huyenquans, as: 'xaphuonghuyenquan',
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

let editTinhthanhService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id && !data.tentinhthanh) {
                resolve({
                    errCode: 2,
                    errMessage: 'chua truyen tinh thanh'
                })
            }
            let tinhthanh = await db.tinhthanhs.findOne({
                where: { id: data.id },
                raw: false
            });
            if (tinhthanh) {
                tinhthanh.tentinhthanh = data.tentinhthanh;
                await tinhthanh.save();

                resolve({
                    errCode: 0,
                    message: 'cap nhat tinh thanh thanh cong'
                });

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'tinh thanh bi rong'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllTinhthanhService: getAllTinhthanhService,
    getTinhthanhIdService: getTinhthanhIdService,
    createTinhthanhService: createTinhthanhService,
    editTinhthanhService: editTinhthanhService,
    deleteTinhthanhService: deleteTinhthanhService
}   