import db from "../models/index"
require('dotenv').config();

let getAllLichkhamService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let lichkhams = await db.lichkhams.findAll()
            resolve({
                errCode: 0,
                data: lichkhams
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createLichkhamService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id_lichbacsikham || !data.gio) {
                resolve({
                    errCode: 1,
                    errmessage: "chua truyen lichkham"
                });
            } else {
                let lichkham1 = await db.lichkhams.create({
                    id_lichbacsikham: data.id_lichbacsikham,
                    gio: data.gio,
                })
                // let lichkham1 = await db.lichkhams.findAll({
                //     limit: 1,
                //     where: { roleId: 'R2' },
                //     order: [['createdAt', 'DESC']],
                //     raw: true,
                //     nest: true
                // })
                resolve({
                    errCode: 0,
                    message: "ok",
                    data: lichkham1
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteLichkhamService = (id) => {
    return new Promise(async (resolve, reject) => {
        let foundLichkham = await db.lichkhams.findOne({
            where: { id: id }
        })
        if (!foundLichkham) {
            resolve({
                errCode: 2,
                errMessage: `khong tim thay lichkham`
            })
        }
        await db.lichkhams.destroy({
            where: { id: id }
        });
        resolve({
            errCode: 0,
            errMessage: `lichkham da duoc xoa`
        })
    })
}

let getLichkhamIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'chua truyen lichkham!'
                })
            } else {
                let data = await db.lichkhams.findOne({
                    where: {
                        id: id,
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

let editLichkhamService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id_lichbacsikham || !data.gio) {
                resolve({
                    errCode: 2,
                    errMessage: 'chua truyen lichkham'
                })
            }
            let lichkham = await db.lichkhams.findOne({
                where: { id: data.id },
                raw: false
            });
            if (lichkham) {
                lichkham.id_lichbacsikham = data.id_lichbacsikham;
                lichkham.gio = data.gio;
                await lichkham.save();

                resolve({
                    errCode: 0,
                    message: 'cap nhat lichkham thanh cong'
                });

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'lichkham bi rong'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllLichkhamService: getAllLichkhamService,
    getLichkhamIdService: getLichkhamIdService,
    createLichkhamService: createLichkhamService,
    editLichkhamService: editLichkhamService,
    deleteLichkhamService: deleteLichkhamService
}   