require("dotenv").config();
import nodemailer from "nodemailer";
let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Trần Ngọc Khánh Long 👻" <tnkhanhlong0201@gmail.com>', // sender address
    to: "nrsin061@gmail.com", // list of receivers dataSend.reciverEmail
    subject: "Long Sin HOPITAL ✔", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

let sendSimpleEmail1 = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let mail = "sinb1805653@student.ctu.edu.vn";
  let info = await transporter.sendMail({
    from: '"Trần Ngọc Khánh Long 👻" <tnkhanhlong0201@gmail.com>', // sender address
    to: mail, // list of receivers
    subject: "Long Sin HOPITAL ✔", // Subject line
    text: "Hello world?", // plain text body
    html: BenhNhanPhanHoi(dataSend), // html body
  });
};

let sendSimpleEmailLayMatKhau = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  // let mail = "sinb1805653@student.ctu.edu.vn";
  let info = await transporter.sendMail({
    from: '"Trần Ngọc Khánh Long 👻" <tnkhanhlong0201@gmail.com>', // sender address
    to: dataSend, // list of receivers
    subject: "Long Sin HOPITAL ✔", // Subject line
    text: "Hello world?", // plain text body
    html: LayMatKhau(dataSend), // html body
  });
};
let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  result = `
        <p> Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Website Bệnh Viện ABC</p>
        <h1>Đơn Thuốc</h1>
        <h3> Họ tên bệnh nhân:  ${dataSend.patientName}!</h3>
        <div><b>Thời gian: ${dataSend.time}</b></div>
         <div><b>Ngày: ${dataSend.ngay}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <div><b>Số điện thoại Bác sĩ: ${dataSend.sdtbacsi}</b></div>
        <div><b>Phòng: ${dataSend.phong}</b></div>
        <div><b>Chuyên khoa: ${dataSend.chuyenkhoa}</b></div>
        <div><b>Chuẩn đoán: ${dataSend.chuandoan}</b></div>
        <div><b>Lời dặn: ${dataSend.loidan}</b></div>
        <div><b>Ghi chú: ${dataSend.ghichu}</b></div>
        <div><b>Chỉ định dùng thuốc:</b></div>
           <table>
            <tr>
                <th>Tên thuốc</th>
                <th>Lièu dùng</th>
                <th>Cách dùng</th>
                <th>Số lượng</th>
                 <th>Đơn vị tính</th>
            </tr>
            <tr>
                <td>${dataSend.tenthuoc}</td>
                <td>${dataSend.lieudung}</td>
                <td>${dataSend.cachdung}</td>
                <td>${dataSend.soluong}</td>
                 <td>${dataSend.dvt}</td>
            </tr>
            <tr>
                <td>${dataSend.tenthuoc1}</td>
                <td>${dataSend.lieudung1}</td>
                <td>${dataSend.cachdung1}</td>
                <td>${dataSend.soluong1}</td>
                 <td>${dataSend.dvt1}</td>
            </tr>
    </table >
        <p>Rất mong bệnh nhân đúng giờ khám đã đăng ký.</p>
        <div>Xin chân thành cảm ơn</div>
        `;
  return result;
};

let BenhNhanPhanHoi = (dataSend) => {
  let result = "";
  result = `
        <p> Người dùng có tên <b>${dataSend.ten}</b> đã gửi phản hồi</p>
        <div><b>Tiêu đề: ${dataSend.tieude}</b></div>
        <div><b>Nội dung: ${dataSend.noidung}</b></div>
        <div><b>Email phản hồi: ${dataSend.email}</b></div>
        `;
  return result;
};

let LayMatKhau = (dataSend) => {
  let result = "";
  result = `
        <p> Tài khoản <b>${dataSend.email}</b></p>
        <div> Mật khẩu mới của bạn là: ${dataSend.passNew}</div>
       
        `;
  return result;
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  BenhNhanPhanHoi: BenhNhanPhanHoi,
  sendSimpleEmail1: sendSimpleEmail1,
  LayMatKhau: LayMatKhau,
  sendSimpleEmailLayMatKhau: sendSimpleEmailLayMatKhau,
};
