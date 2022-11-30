import express from "express";
import chucvuController from "../controllers/chucvuController";
import hoatchatController from "../controllers/hoatchatController";
import nhasxController from "../controllers/nhasxController";
import tdhvController from "../controllers/tdhvController";
import chuyenkhoaController from "../controllers/chuyenkhoaController";
import tinhthanhController from "../controllers/tinhthanhController";
import huyenquanController from "../controllers/huyenquanController";
import xaphuongController from "../controllers/xaphuongController";
import vienchucController from "../controllers/vienchucController";
import phongController from "../controllers/phongController";
import tangController from "../controllers/tangController";
import buoiController from "../controllers/buoiController";
import lichbacsikhamController from "../controllers/lichbacsikhamController";
import benhnhanController from "../controllers/benhnhanController";
import dangkyController from "../controllers/dangkyController";
import lichkhamController from "../controllers/lichkhamController";
import thuocController from "../controllers/thuocController";
import phieukhamController from "../controllers/phieukhamController";
import chidinhController from "../controllers/chidinhController";
import tempController from "../controllers/tempController";
import timkiemController from "../controllers/timkiemController";
import testController from "../controllers/testController";
import giakhamController from "../controllers/giakhamController";
import giadichvuController from "../controllers/giadichvuController";
import giathuocController from "../controllers/giathuocController";
import phuongthucthanhtoanController from "../controllers/phuongthucthanhtoanController";
import CountController from "../controllers/CountController";
import searchController from "../controllers/searchController";
import dichvuController from "../controllers/dichvuController";

import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/create-chucvu", chucvuController.createChucvu);
  router.put("/api/edit-chucvu", chucvuController.editChucvu);
  router.delete("/api/delete-chucvu", chucvuController.deleteChucvu);
  router.get("/api/get-all-chucvu", chucvuController.getAllChucvu);
  router.get("/api/get-id-chucvu", chucvuController.getChucvuId);

  router.post("/api/create-hoatchat", hoatchatController.createHoatchat);
  router.put("/api/edit-hoatchat", hoatchatController.editHoatchat);
  router.delete("/api/delete-hoatchat", hoatchatController.deleteHoatchat);
  router.get("/api/get-all-hoatchat", hoatchatController.getAllHoatchat);
  router.get("/api/get-id-hoatchat", hoatchatController.getHoatchatId);

  router.post("/api/create-nhasx", nhasxController.createNhasx);
  router.put("/api/edit-nhasx", nhasxController.editNhasx);
  router.delete("/api/delete-nhasx", nhasxController.deleteNhasx);
  router.get("/api/get-all-nhasx", nhasxController.getAllNhasx);
  router.get("/api/get-id-nhasx", nhasxController.getNhasxId);

  router.post("/api/create-tdhv", tdhvController.createTdhv);
  router.put("/api/edit-tdhv", tdhvController.editTdhv);
  router.delete("/api/delete-tdhv", tdhvController.deleteTdhv);
  router.get("/api/get-all-tdhv", tdhvController.getAllTdhv);
  router.get("/api/get-id-tdhv", tdhvController.getTdhvId);

  router.post("/api/create-chuyenkhoa", chuyenkhoaController.createChuyenkhoa);
  router.put("/api/edit-chuyenkhoa", chuyenkhoaController.editChuyenkhoa);
  router.delete(
    "/api/delete-chuyenkhoa",
    chuyenkhoaController.deleteChuyenkhoa
  );
  router.get("/api/get-all-chuyenkhoa", chuyenkhoaController.getAllChuyenkhoa);
  router.get("/api/get-id-chuyenkhoa", chuyenkhoaController.getChuyenkhoaId);

  router.post("/api/create-tinhthanh", tinhthanhController.createTinhthanh);
  router.put("/api/edit-tinhthanh", tinhthanhController.editTinhthanh);
  router.delete("/api/delete-tinhthanh", tinhthanhController.deleteTinhthanh);
  router.get("/api/get-all-tinhthanh", tinhthanhController.getAllTinhthanh);
  router.get("/api/get-id-tinhthanh", tinhthanhController.getTinhthanhId);

  router.post("/api/create-huyenquan", huyenquanController.createHuyenquan);
  router.put("/api/edit-huyenquan", huyenquanController.editHuyenquan);
  router.delete("/api/delete-huyenquan", huyenquanController.deleteHuyenquan);
  router.get("/api/get-all-huyenquan", huyenquanController.getAllHuyenquan);
  router.get("/api/get-id-huyenquan", huyenquanController.getHuyenquanId);

  router.post("/api/create-xaphuong", xaphuongController.createXaphuong);
  router.put("/api/edit-xaphuong", xaphuongController.editXaphuong);
  router.delete("/api/delete-xaphuong", xaphuongController.deleteXaphuong);
  router.get("/api/get-all-xaphuong", xaphuongController.getAllXaphuong);
  router.get("/api/get-id-xaphuong", xaphuongController.getXaphuongId);

  router.post("/api/create-vienchuc", vienchucController.createVienchuc);

  /////////////// xử lý ảnh viên chức
  router.post(
    "/api/create-imagevienchuc",
    vienchucController.createImageVienchuc
  );
  router.put("/api/edit-imagevienchuc", vienchucController.editImageVienchuc);

  /////// xử lý ảnh chuyên khoa
  router.post(
    "/api/create-imagechuyenkhoa",
    chuyenkhoaController.createImageChuyenKhoa
  );
  router.put(
    "/api/edit-imagechuyenkhoa",
    chuyenkhoaController.editImageChuyenKhoa
  );

  router.put("/api/edit-vienchuc", vienchucController.editVienchuc);
  router.delete("/api/delete-vienchuc", vienchucController.deleteVienchuc);
  router.get("/api/get-all-vienchuc", vienchucController.getAllVienchuc);
  router.get("/api/get-id-vienchuc", vienchucController.getVienchucId);
  router.get(
    "/api/get-id-vienchuc-chucvu",
    vienchucController.getVienchucChucvuId
  );
  router.get(
    "/api/get-id-vienchuc-chuyenkhoa",
    vienchucController.getVienchucChuyenkhoaId
  );
  router.get("/api/get-id-bacsi", vienchucController.getBacsiId);

  router.post("/api/create-phong", phongController.createPhong);
  router.put("/api/edit-phong", phongController.editPhong);
  router.delete("/api/delete-phong", phongController.deletePhong);
  router.get("/api/get-all-phong", phongController.getAllPhong);
  router.get("/api/get-id-phong", phongController.getPhongId);
  router.get(
    "/api/get-id-phong-chuyenkhoa",
    phongController.getPhongChuyenkhoaId
  );

  router.post("/api/create-tang", tangController.createTang);
  router.put("/api/edit-tang", tangController.editTang);
  router.delete("/api/delete-tang", tangController.deleteTang);
  router.get("/api/get-all-tang", tangController.getAllTang);
  router.get("/api/get-id-tang", tangController.getTangId);

  router.post("/api/create-buoi", buoiController.createBuoi);
  router.put("/api/edit-buoi", buoiController.editBuoi);
  router.delete("/api/delete-buoi", buoiController.deleteBuoi);
  router.get("/api/get-all-buoi", buoiController.getAllBuoi);
  router.get("/api/get-id-buoi", buoiController.getBuoiId);

  router.post(
    "/api/create-lichbasikham",
    lichbacsikhamController.createLichbacsikham
  );
  router.put(
    "/api/edit-lichbacsikham",
    lichbacsikhamController.editLichbacsikham
  );
  router.delete(
    "/api/delete-lichbacsikham",
    lichbacsikhamController.deleteLichbacsikham
  );
  router.get(
    "/api/get-all-lichbacsikham",
    lichbacsikhamController.getAllLichbacsikham
  );
  router.get(
    "/api/get-id-lichbacsikham",
    lichbacsikhamController.getLichbacsikhamId
  );
  router.get(
    "/api/get-id-bacsi-lichbacsikham",
    lichbacsikhamController.getBacsiLichbacsikhamId
  );
  router.get(
    "/api/get-id-ngay-lichbacsikham",
    lichbacsikhamController.getBacsiNgayLichbacsikhamId
  );
  router.post(
    "/api/bulk-create-schedule",
    lichbacsikhamController.bulkCreateScheduele
  );
  router.get(
    "/api/get-chuyenkhoa-all-lichbacsikham",
    lichbacsikhamController.getAllChuyenkhoaLichbacsikham
  );

  router.post(
    "/api/kiemtra-xaosua-lichbacsikham",
    lichbacsikhamController.kiemtrakhixoavasuaController
  );

  router.post("/api/create-benhnhan", benhnhanController.createBenhnhan);
  router.put("/api/edit-benhnhan", benhnhanController.editBenhnhan);
  router.delete("/api/delete-benhnhan", benhnhanController.deleteBenhnhan);
  router.get("/api/get-all-benhnhan", benhnhanController.getAllBenhnhan);
  router.get("/api/get-id-benhnhan", benhnhanController.getBenhnhanId);
  //// gửi mail
  router.post(
    "/api/patient-book-appointment",
    benhnhanController.postBookAppointment
  );

  router.post(
    "/api/benhnhan-phanhoi",
    benhnhanController.BenhNhanPhanHoiController
  );
  router.post(
    "/api/patient-chidinh-appointment",
    benhnhanController.postChidinhAppointment
  );

  router.post("/api/create-dangky", dangkyController.createDangky);
  router.put("/api/edit-dangky", dangkyController.editDangky);
  router.delete("/api/delete-dangky", dangkyController.deleteDangky);
  router.get("/api/get-all-dangky", dangkyController.getAllDangky);
  router.get("/api/get-id-dangky", dangkyController.getDangkyId);
  router.get("/api/get-id-bacsi-dangky", dangkyController.getBacsiDangkyId);

  router.get(
    "/api/get-id-one-bacsi-dangky",
    dangkyController.getBacsiOneDangkyId
  );
  router.get(
    "/api/get-id-vienchuc-dangky",
    dangkyController.getVienchucDangkyId
  );
  router.get(
    "/api/get-id-dangky-benhnhan",
    dangkyController.getIdDangKyTheoBenhnhan
  );

  router.post("/api/check-dangky", dangkyController.kiemtradangkyController);
  router.post(
    "/api/tim-id-theo-vienchuc-ngay",
    dangkyController.timidtheovienchucngayController
  );

  router.post("/api/create-lichkham", lichkhamController.createLichkham);
  router.put("/api/edit-lichkham", lichkhamController.editLichkham);
  router.delete("/api/delete-lichkham", lichkhamController.deleteLichkham);
  router.get("/api/get-all-lichkham", lichkhamController.getAllLichkham);
  router.get("/api/get-id-lichkham", lichkhamController.getLichkhamId);

  router.post("/api/create-thuoc", thuocController.createThuoc);
  router.put("/api/edit-thuoc", thuocController.editThuoc);
  router.delete("/api/delete-thuoc", thuocController.deleteThuoc);
  router.get("/api/get-all-thuoc", thuocController.getAllThuoc);
  router.get("/api/get-id-thuoc", thuocController.getThuocId);

  router.post("/api/create-phieukham", phieukhamController.createPhieukham);
  router.put("/api/edit-phieukham", phieukhamController.editPhieukham);
  router.delete("/api/delete-phieukham", phieukhamController.deletePhieukham);
  router.get("/api/get-all-phieukham", phieukhamController.getAllPhieukham);
  router.get("/api/get-id-phieukham", phieukhamController.getPhieukhamId);
  router.get(
    "/api/get-id-benhnhan-phieukham",
    phieukhamController.getBenhNhanPhieukhamId
  );
  router.get(
    "/api/get-id-benhnhan-phieukham1",
    phieukhamController.getBenhNhanPhieukhamId1
  );

  router.post("/api/create-chidinh", chidinhController.createChidinh);
  router.put("/api/edit-chidinh", chidinhController.editChidinh);
  router.delete("/api/delete-chidinh", chidinhController.deleteChidinh);
  router.get("/api/get-all-chidinh", chidinhController.getAllChidinh);
  router.get("/api/get-id-chidinh", chidinhController.getChidinhId);
  router.post("/api/bulk-create-chidinh", chidinhController.bulkCreateChidinh);
  router.get(
    "/api/get-id-dangky-chidinh",
    chidinhController.getDangkyChidinhId
  );
  router.get(
    "/api/get-id-dangky-chidinh1",
    chidinhController.getDangkyChidinhId1
  );
  router.get(
    "/api/get-id-benhnhan-chidinh",
    chidinhController.getBenhNhanChidinhId
  );
  router.get(
    "/api/get-id-benhnhan-chidinh1",
    chidinhController.getBenhNhanChidinhId1
  );
  router.get(
    "/api/get-id-phieukham-chidinh",
    chidinhController.getPhieuKhamChidinhId
  );

  router.post("/api/create-temp", tempController.createTemp);
  router.put("/api/edit-temp", tempController.editTemp);
  router.delete("/api/delete-temp", tempController.deleteTemp);
  router.get("/api/get-all-temp", tempController.getAllTemp);
  router.get("/api/get-id-temp", tempController.getTempId);

  router.post("/api/login", vienchucController.handleLogin);
  router.post("/api/login1", benhnhanController.handleBenhnhanLogin);

  ///// test connect mssql

  router.get("/api/timkiem/:data", timkiemController.searchThuocController);

  // đổi mật khẩu
  router.post("/api/doimatkhau", benhnhanController.DoiMatKhauController);

  // lấy lại mật khẩu
  router.post("/api/layMatKhau", benhnhanController.LayMatKhauController);

  // check email
  router.get(
    "/api/checkemail",
    benhnhanController.checkBenhnhanEmailController
  );

  /////// test csdl
  router.get("/api/testbenhnhans", benhnhanController.testbenhnhan);

  ////

  ////////////////////////////////////// test upload file ảnh

  router.post("/upload", testController.createTestController);

  ////////////////////// giá khám
  router.get("/api/get-gia-kham", giakhamController.getAllGiaKham);

  /////////////////////// giá dịch vụ
  router.get(
    "/api/get-gia-dich-vu",
    giadichvuController.getAllGiadichvuController
  );
  //////////////////////// giá thuốc
  router.get("/api/get-gia-thuoc", giathuocController.getAllGiaThuoc);
  //////////// phương thức thanh toán
  router.get(
    "/api/get-phuong-thuc-thanh-toan",
    phuongthucthanhtoanController.getAllPhuongthucthanhtoan
  );

  /////// điếm số lượng đăng ký

  router.post(
    "/api/count-dangky",
    lichbacsikhamController.CountDangKyController
  );

  router.post(
    "/api/count-dang-ky-bac-si",
    CountController.demsoluongdangkyController
  );

  /// tìm kiếm tất cả

  router.post("/api/search-all", searchController.searchAllController);
  router.post(
    "/api/search-lichbacsikham",
    searchController.searchLichBacsikhamController
  );

  /// dịch vụ
  router.get("/api/get-all-dichvu", dichvuController.getAllDichVuController);

  ////// sms
  router.get("/api/gui-sms", benhnhanController.guisms);

  return app.use("/", router);
};

module.exports = initWebRoutes;
