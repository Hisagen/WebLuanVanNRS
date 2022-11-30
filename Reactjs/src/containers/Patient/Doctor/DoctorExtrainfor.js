import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtrainfor.scss";
class DoctorExtrainfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {}

  render() {
    return (
      <div className="doctor-infor-extrain-container">
        <div className="diachi">
          <i className="fas fa-map-marker-alt">
            {" "}
            &nbsp; Đường 3/2, Trường Đại học Cần Thơ, Ninh Kiều, Cần Thơ
          </i>
        </div>
        <div className="giakham">Giá Khám: 30.000 đ</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
