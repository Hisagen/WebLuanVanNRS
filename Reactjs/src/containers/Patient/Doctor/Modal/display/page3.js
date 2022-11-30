import React, { Component } from "react";
import { connect } from "react-redux";
import "./page3.scss";
class page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tennhasx: "",
    };
  }

  render() {
    return (
      <div className="container-pag3 animate__animated animate__zoomIn">
        <i className=" fas fa-check-circle ">
          <div className="status">Thanh toán thành công</div>
          <div className="thank">
            Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi
          </div>
        </i>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(page3);
