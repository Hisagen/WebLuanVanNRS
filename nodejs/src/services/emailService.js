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
    to: dataSend.reciverEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  result = `
        <h3> Xin chào ${dataSend.patientName}!</h3>
        <p> Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Website Bệnh Viện LONG SIN HOSPITAL</p>
        <p>Thông tin đặt lịch khám bệnh</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
         <div><b>Ngày: ${dataSend.ngay}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <div><b>Số điện thoại Bác sĩ: ${dataSend.sdtbacsi}</b></div>
        <div><b>Phòng: ${dataSend.phong}</b></div>
        <div><b>Chuyên khoa: ${dataSend.chuyenkhoa}</b></div>
        <p>Rất mong bệnh nhân đúng giờ khám đã đăng ký.</p>
        <div>Xin chân thành cảm ơn</div>
        `;
  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
