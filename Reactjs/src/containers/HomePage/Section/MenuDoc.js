import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./MenuDoc.scss";
import Slider from "react-slick";
// import HomeHeader from "../HomePage/HomeHeader";
// import HomeFooter from "../HomePage/HomeFooter";
class MenuDoc extends Component {
  render() {
    return (
      <>
        {/* <HomeHeader isShowBanner={false} /> */}
        <div className="MenuDoc">
          <div className="table1">
            <div>Trang chủ</div>

            <div>Cẩm nang</div>

            <div>Liên hệ</div>

            <div>Góp ý</div>
            <div className="icon">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
          <div className="table2"></div>
        </div>
        {/* <HomeFooter /> */}
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

export default connect(mapStateToProps)(MenuDoc);
