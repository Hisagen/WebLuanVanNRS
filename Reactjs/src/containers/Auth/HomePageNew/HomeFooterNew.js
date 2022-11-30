import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeFooterNew.scss";
import Slider from "react-slick";
import logo2 from "../../../assets/logo2.png";
import bgend from "../../../assets/backgroundend.jpg";
import { Link } from "react-router-dom";
class HomeFooterNew extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="background-end">
          <img src={bgend}></img>

          <div className="chung">
            <div className="tren">
              <div className="table1">
                <div className="logo">
                  <Link to={"/homenew"} style={{ background: "none" }}>
                    <img className="footer-logo" src={logo2} />
                  </Link>
                </div>
                <div className="title1">
                  <p>Công ty Cổ phần Công nghệ Long Sin HOSPITAL</p>
                </div>
                <div className="title1">
                  <p>
                    <i className="fas fa-map-marker-alt"></i> Trường Đại học Cần
                    Thơ, Khu II, Đ. 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ
                  </p>
                </div>
                <div className="title1">
                  <p>
                    <i className="fas fa-check"></i> ĐKKD số: 123456. Sở KHĐT
                    Cần Thơ cấp ngày 16/03/2015
                  </p>
                </div>
              </div>
              <div className="table2">
                <div className="khung-table3">
                  <div className="title2">
                    <p>Liên hệ hợp tác</p>
                  </div>
                  <div className="title2">
                    <p>Tuyển dụng</p>
                  </div>
                  <div className="title2">
                    <p>Điều khoản sử dụng</p>
                  </div>
                  <div className="title2">
                    <p>Chính sách bảo mật</p>
                  </div>
                </div>
              </div>
              <div className="table3">
                <div className="khung-table3">
                  <p className="title3">Trụ sở tại Cần Thơ</p>
                  <p className="content1">
                    Trường Đại học Cần Thơ, Khu II, Đ. 3/2, Xuân Khánh, Ninh
                    Kiều, Cần Thơ
                  </p>
                  <p className="title3">Văn phòng tại Cần Thơ</p>
                  <p className="content1">
                    Trường Đại học Cần Thơ, Khu II, Đ. 3/2, Xuân Khánh, Ninh
                    Kiều, Cần Thơ
                  </p>
                  <p className="title3">Hỗ trợ khách hàng:</p>
                  <p className="content1">&nbsp; nrsin061@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="duoi">
              <p>
                &copy; 2021 Long Sin HOSPITAL, More Infomation, Please visit my
                youtube channel.
                <a
                  target="_blank"
                  href="https://www.youtube.com/watch?v=XMEQO6kpYPA"
                >
                  &#8594; Click here.&#8592;
                </a>
              </p>
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

export default connect(mapStateToProps)(HomeFooterNew);
