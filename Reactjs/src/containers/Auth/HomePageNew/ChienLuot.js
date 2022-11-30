import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ChienLuot.scss";
import Slider from "react-slick";
import logo2 from "../../../assets/logo2.png";
import bgend from "../../../assets/backgroundend.jpg";
// ảnh chỗ chiến lượt
import chienluot1 from "../../../assets/homenew/img_luachon/luachon1.jpg";
import chienluot2 from "../../../assets/homenew/img_luachon/luachon2.jpg";
import chienluot3 from "../../../assets/homenew/img_luachon/luachon3.jpg";
import chienluot4 from "../../../assets/homenew/img_luachon/luachon4.jpg";
import chienluot5 from "../../../assets/homenew/img_luachon/luachon5.jpg";
import chienluot6 from "../../../assets/homenew/img_luachon/luachon6.jpg";

class ChienLuot extends Component {
  render() {
    return (
      <div className="chienluot" ref={this.chienluot}>
        <div className="title-luachon">The strategic choice of the clinic</div>
        <div className="chung">
          <div>
            <img src={chienluot1}></img>

            <div className="direction">
              Chỉ cần 5 phút để cài đặt, miễn phí bảo trì
            </div>
          </div>
          <div>
            <img src={chienluot2}></img>
            <div className="direction">Sử dụng nền tảng điện toán đám mây</div>
          </div>
          <div>
            <img src={chienluot3}></img>
            <div className="direction">
              Hội chuẩn trực tuyến, khám chữa bệnh từ xa
            </div>
          </div>
          <div>
            <img src={chienluot4}></img>
            <div className="direction">Cảnh báo thuốc kê đơn</div>
          </div>
          <div>
            <img src={chienluot5}></img>
            <div className="direction">Phù hợp với nhiều quy mô phòng khám</div>
          </div>
          <div>
            <img src={chienluot6}></img>
            <div className="direction">
              Quản lý hồ sơ bệnh án theo HL7, PACS. tiêu chuẩn Đặc sản phổ biến
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vienchuc.isLoggedIn,
    language: state.app.language,
  };
};

export default connect(mapStateToProps)(ChienLuot);
