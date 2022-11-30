import db from "../models/index";
require("dotenv").config();

let createTestService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({
        data,
        errCode: 0,
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createTestService: createTestService,
};
