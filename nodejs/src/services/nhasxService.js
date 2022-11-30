import db from "../models/index"
require('dotenv').config();
let getAllNhasxService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let nhasxs = await db.nhasxs.findAll()
            resolve({
                errCode: 0,
                data: nhasxs
            })
        } catch (e) {
            reject(e);
        }
    })
}

let createNhasxService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.tennhasx) {
                resolve({
                    errCode: 1,
                    errMessage: "chua truyen nha sx"
                });
            } else {
                await db.nhasxs.create({
                    tennhasx: data.tennhasx,
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

let deleteNhasxService = (id) => {
    return new Promise(async (resolve, reject) => {
        let foundNhasx = await db.nhasxs.findOne({
            where: { id: id }
        })
        if (!foundNhasx) {
            resolve({
                errCode: 2,
                errMessage: `khong tim thay nha sx`
            })
        }
        await db.nhasxs.destroy({
            where: { id: id }
        });
        resolve({
            errCode: 0,
            errMessage: `nha sx da duoc xoa`
        })
    })

}

let getNhasxIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'chua truyen nhasx!'
                })
            } else {
                let data = await db.nhasxs.findOne({
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

let editNhasxService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id && !data.tennhasx) {
                resolve({
                    errCode: 2,
                    errMessage: 'chua truyen nha sx'
                })
            }
            let nhasx = await db.nhasxs.findOne({
                where: { id: data.id },
                raw: false
            });
            if (nhasx) {
                nhasx.tennhasx = data.tennhasx;
                await nhasx.save();

                resolve({
                    errCode: 0,
                    message: 'cap nhat nha sx thanh cong'
                });

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'nha sx bi rong'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllNhasxService: getAllNhasxService,
    getNhasxIdService: getNhasxIdService,
    createNhasxService: createNhasxService,
    editNhasxService: editNhasxService,
    deleteNhasxService: deleteNhasxService
}   