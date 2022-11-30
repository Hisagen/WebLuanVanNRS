import db from "../models/index"
require('dotenv').config();
let getAllTdhvService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let tdhvs = await db.tdhvs.findAll()
            resolve({
                errCode: 0,
                data: tdhvs
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createTdhvService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.tentdhv) {
                resolve({
                    errCode: 1,
                    errmessage: "chua truyen tdhv"
                });
            } else {
                await db.tdhvs.create({
                    tentdhv: data.tentdhv,
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

let deleteTdhvService = (id) => {
    return new Promise(async (resolve, reject) => {
        let foundTdhv = await db.tdhvs.findOne({
            where: { id: id }
        })
        if (!foundTdhv) {
            resolve({
                errCode: 2,
                errMessage: `khong tim thay tdhv`
            })
        }
        await db.tdhvs.destroy({
            where: { id: id }
        });
        resolve({
            errCode: 0,
            errMessage: `tdhv da duoc xoa`
        })
    })

}

let getTdhvIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'chua truyen tdhv!'
                })
            } else {
                let data = await db.tdhvs.findOne({
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

let editTdhvService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id && !data.tentdhv) {
                resolve({
                    errCode: 2,
                    errMessage: 'chua truyen tdhv'
                })
            }
            let tdhv = await db.tdhvs.findOne({
                where: { id: data.id },
                raw: false
            });
            if (tdhv) {
                tdhv.tentdhv = data.tentdhv;
                await tdhv.save();

                resolve({
                    errCode: 0,
                    message: 'cap nhat tdv thanh cong'
                });

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'tdhv bi rong'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllTdhvService: getAllTdhvService,
    getTdhvIdService: getTdhvIdService,
    createTdhvService: createTdhvService,
    editTdhvService: editTdhvService,
    deleteTdhvService: deleteTdhvService
}   