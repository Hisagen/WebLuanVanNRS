import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { createLogger } from "redux-logger";
import "./OurStadingDoctor.scss";
class OurStadingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, presState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/api/get-id-bacsi/${doctor.id}`);
  };
  hanldeDanhSachBacSi = () => {
    this.props.history.push(`/page-all-doctor`);
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
    return (
      <div className="section-share section-ourstading-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Các Bác sĩ của chúng tôi</span>
            <button
              className="btn-section"
              onClick={() => this.hanldeDanhSachBacSi()}
            >
              Xem thêm
            </button>
          </div>
          <div className="section-body section-ourstadingDoctor">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  {
                    if (item?.imagePath) {
                      imageBase64 =
                        "http://localhost:3002/Image/ChucVu/" + item?.imageName;
                    }
                  }

                  return (
                    <div key={index}>
                      <div
                        className="section-customize doctor-css  ourstadingDoctor-chidl"
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div className="customize-border">
                          <div className="outer-bg">
                            <div
                              className="bg-image section-ourstading-doctor "
                              style={{ backgroundImage: `url(${imageBase64})` }}
                            ></div>
                          </div>
                          <div className="text-center">
                            <div>{item?.hoten}</div>
                            <div className="name-ck">
                              {item?.vienchucchuyenkhoa?.tenchuyenkhoa}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="btn-datkham"
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <button>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGeSURBVHgB3VXtUcMwDFV6DJANCBOQDTATUCZomKDdoNmgZQLYgHaCsEFhgmSDdAMj06dDVR3SpP/67nSK9WHJshQTXQuSPgPvfcpszuSYMqVqmLZMmyRJGhoLDrDy52GFZAYHyNUmH0xTpgyUY/2ubOqgo6Fgp6LPEUHrQYHYaMk0pwEIpWLaIVDVZ1zAcIf1FNkJLSBfGLlDIDnRQu87MXGW4K/gOR06SkguNzVyxx22Z/4C/Yw6TiEXXStZCdkatU9VeTLIA0rl00KWx06SgX9HctiHWUC2FDhmYx+x3aoqnAQR4RddhgY8iwWJQTLtGrRbOgOTSAbaUU41s/0fOooOv5qAT6W6p+MEj5xOLh5yPdWtalvB2tiLzlEMqjOckZdmYwlYGrsilihFNtMZV7pMqmXXHf6SSPFfkNyfolXzUdq5UL5vXaew3eXAN0x3dLjQEKCg7sTCYFawCZf9aG1uOnx/h42dG6ylhWX9xLrQeQ/YPIXuufcBM+Vq1Xemsq4jJa38kLfE//15JVBh9PLPqsAdjYUf88pdPX4AVkVhoJ7NOBsAAAAASUVORK5CYII="></img>
                          Đặt khám
                        </button>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isLoggedIn1: state.vienchuc.isLoggedIn1,
    topDoctorsRedux: state.admin.bacsis,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchAllBacsiStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OurStadingDoctor)
);
