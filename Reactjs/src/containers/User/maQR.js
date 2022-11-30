import React, { useState } from "react";
import QRCode from "qrcode";
import "./maQR.scss";
function MaQR() {
  const [qr, setQr] = useState("");
  const [name, setName] = useState("Nguyễn Ra Sin");
  const [email, setEmail] = useState("sinb1805653@student.ctu.edu.vn");
  const [sdt, setSdt] = useState("0393349814");
  const [maBN, setMaBN] = useState("1");
  const [url, setUrl] = useState(`Mã Bệnh Nhân:${maBN}`);
  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);

        console.log(url);
        setQr(url);
      }
    );
  };

  return (
    <div className="QR">
      <h1>QR Generator</h1>
      <div
        style={{ height: "200px", width: "200px" }}
        type="text"
        placeholder="e.g. https://google.com"
        // value={url}
        onChange={(e) => setUrl(e.target.value)}
        dangerouslySetInnerHTML={{
          __html: "<h1>Hello</h1>",
        }}
      />
      <button onClick={GenerateQRCode}>Generate</button>

      <div
        contentEditable="true"
        dangerouslySetInnerHTML={{
          __html: "<div>Hello</div>",
        }}
        style={{ pointerEvents: "none" }}
      ></div>
      {qr && (
        <>
          <img src={qr} className="img" />
          <a href={qr} download="qrcode.png">
            Download
          </a>
        </>
      )}
    </div>
  );
}

export default MaQR;
