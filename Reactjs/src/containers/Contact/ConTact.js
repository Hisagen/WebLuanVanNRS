import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ConTact.scss";
import Slider from "react-slick";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
class ConTact extends Component {
  render() {
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="contact">
          <div className="lien-he">
            <div className="title">Liên hệ</div> <br />
            <span>Bệnh viện đa khoa thành phố Cần Thơ</span>
            <p>
              Địa chỉ: Số 04 Châu Văn Liêm , P. An Lạc, Q. Ninh Kiều, TP. Cần
              Thơ
            </p>
            <p>Điện thoại: (84-0292) 3 821 236 Fax: (84-0292) 3 821 235</p>
            <p>Email: bvdktpct@ytct.gov.vn - tccb.bvdktpct@gmail.com</p>
          </div>

          <div className="khung-tintuc">
            <div className="title">Tin Nổi Bật</div>
            <marquee direction="up" scrollamount="3" height="200px">
              <div className="khung">
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU
                  ÂM DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM
                  ĐÀN HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS
                  TUYẾN GIÁP
                </p>
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU
                  ÂM DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM
                  ĐÀN HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS
                  TUYẾN GIÁP
                </p>
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU
                  ÂM DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM
                  ĐÀN HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS
                  TUYẾN GIÁP
                </p>
              </div>
            </marquee>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vienchuc.isLoggedIn,
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(ConTact);
