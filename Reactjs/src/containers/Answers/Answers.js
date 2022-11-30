import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Answers.scss";
import Slider from "react-slick";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
class Anwers extends Component {
  render() {
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="answers">
          <div className="title title1">Giải đáp</div> <br />
          <div className="khung">
            <div className="table1">
              <div className="title">Giải đáp nhanh</div>
              <div className="answers1">
                <i className="fas fa-angle-right"></i> Vấn đề chung
              </div>
              <div className="answers1">
                <i className="fas fa-angle-right"></i> Vấn đề về tài khoản
              </div>
              <div className="answers1">
                <i className="fas fa-angle-right"></i> Vấn đề về quy trình đặt
                khám
              </div>
              <div className="answers1">
                <i className="fas fa-angle-right"></i> Vấn đề về thanh toán
              </div>
            </div>
            <div className="table2">
              <div>
                Đối tượng bệnh nhân nào cần phần miềm để khám bệnh{" "}
                <span>
                  <i className="fas fa-minus-circle"></i>
                </span>
              </div>
              <div>
                Đăng ký qua phần mềm có tốn phí không?{" "}
                <span>
                  <i className="fas fa-plus-circle"></i>
                </span>
              </div>
              <div>
                Các loại tiền và phí khi sử dụng phần miềm để khám bệnh
                <span>
                  <i className="fas fa-plus-circle"></i>
                </span>
              </div>
            </div>
          </div>
          {/* <div className="khung-tintuc">
            <div className="title">Tin Nổi Bật</div>
            <marquee direction="up" scrollamount="3" height="200px">
              <div className="khung">
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU ÂM
                  DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM ĐÀN
                  HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS TUYẾN
                  GIÁP
                </p>
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU ÂM
                  DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM ĐÀN
                  HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS TUYẾN
                  GIÁP
                </p>
                <p>
                  <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC SIÊU ÂM
                  DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA SIÊU ÂM ĐÀN
                  HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI TIRADS TUYẾN
                  GIÁP
                </p>
              </div>
            </marquee>
          </div> */}
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

export default connect(mapStateToProps)(Anwers);
