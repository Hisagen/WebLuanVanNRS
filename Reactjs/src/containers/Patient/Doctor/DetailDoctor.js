import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeaderNew from "../../Auth/HomePageNew/HomeHeaderNew";
import HomeFooterNew from "../../Auth/HomePageNew/HomeFooterNew";
import "./DetailDoctor.scss";
import { getBacsiIdService } from "../../../services/vienchucService";
import { countDangKyTheoBacSi } from "../../../services/countService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import BookingModalThanhToan from "./Modal/BookingModalThanhToan";
import Page1 from "../Doctor/Modal/display/page1";
import ModalLogin from "./Modal/modalLogin";
import { checkDangKy } from "../../../services/dangkyService";
import { toast } from "react-toastify";
import LikeandShareFB from "../../User/LikeandShareFB";
import Comment from "../../User/Comment";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      giakham: "",
      currentDoctorId: -1,
      action: false,
      isOpenModalBooking: false,
      isOpenModalThanhToan: false,
      phong: "",
      success: "",
      luothen: "",
      openLogin: false,
      check: false,
      show: false,
      ngaychon: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState(
        {
          currentDoctorId: id,
        },
        async () => {
          let temp = await countDangKyTheoBacSi(this.state.currentDoctorId);
          this.setState({
            luothen: temp.data,
          });
        }
      );
      let res = await getBacsiIdService(id);
      if (res && res.errCode === 0) {
        this.setState(
          {
            detailDoctor: res.data,
          },
          () => {
            this.setState({
              giakham: this.formatCash(res?.giakham?.gia_bhyt.toString()),
            });
          }
        );
      }

      let items = JSON.parse(localStorage.getItem("persist:benhnhan"));
      let dataUser = JSON.parse(items?.benhnhanInfo);
      if (items && dataUser?.benhnhan?.id) {
        this.setState({
          show: true,
        });
      } else {
        this.setState({
          show: false,
        });
      }
    }
  }

  componentDidUpdate(prevProps, presState, snapshot) { }

  handleAction = (action) => {
    this.setState({
      action: action,
    });
  };

  handleOpenThanhToan = () => {
    if (this.state.check === true) {
      toast.error("Bạn Đã Đặt Khám Buổi Này Rồi");
    } else {
      this.setState({
        isOpenModalThanhToan: !this.state.isOpenModalThanhToan,
      });
    }
  };
  toggle = () => {
    this.setState({
      isOpenModalThanhToan: !this.state.isOpenModalThanhToan,
    });
  };
  phong = (phong) => {
    if (phong) {
      this.setState(
        {
          phong: phong,
        },
        async () => {
          let items = JSON.parse(localStorage.getItem("persist:benhnhan"));
          let dataUser = JSON.parse(items?.benhnhanInfo);
          let check = await checkDangKy({
            id_lichbacsikham: this.state.phong.id_lichbacsikham,
            id_benhnhan: dataUser?.benhnhan?.id,
          });

          this.setState({
            check: check,
          });
        }
      );
    }
  };
  ngay = (ngay) => { };
  handleSuccess = (success) => {
    this.setState({
      success: success,
    });
  };
  openLogin = (data) => {
    this.setState({
      openLogin: data,
    });
  };
  dangxuat = (check) => {
    if (check === true) {
      this.setState({
        check: false,
        show: false,
      });
    }
  };
  dangnhap = async (data) => {
    if (data === true) {
      let items = JSON.parse(localStorage.getItem("persist:benhnhan"));
      let dataUser = JSON.parse(items?.benhnhanInfo);
      let check = await checkDangKy({
        id_lichbacsikham: this.state.phong.id_lichbacsikham,
        id_benhnhan: dataUser?.benhnhan?.id,
      });

      this.setState({
        check: check,
        show: true,
      });
    }
  };

  formatCash(str) {
    return str
      ?.split("")
      ?.reverse()
      ?.reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  }

  render() {
    let { detailDoctor, giakham } = this.state;
    let imageBase64 = "";
    if (detailDoctor && detailDoctor.vienchuctdhv) {
      {
        imageBase64 =
          "http://localhost:3002/Image/ChucVu/" + detailDoctor.imageName;
      }
    }
    let currentURL = window.location.href;
    return (
      <div>
        <>
          <HomeHeaderNew
            isShow={true}
            openLogin={this.state.openLogin}
            dangxuat={this.dangxuat}
            dangnhap={this.dangnhap}
          />
          <div className="khung-detailDoctor">
            <div className="doctor-detail-container">
              <div className="khung">
                <div className="intro-doctor">
                  <div
                    className="content-left"
                    style={{ backgroundImage: `url(${imageBase64})` }}
                  ></div>
                  <div className="content-right">
                    <div
                      className="up"
                      data-aos="zoom-in"
                      data-aos-duration="1500"
                    >
                      Bác sĩ: {detailDoctor.hoten}
                      <div className="chuyenkhoa">
                        {detailDoctor.vienchucchuyenkhoa?.tenchuyenkhoa}
                      </div>
                      <div className="container-giakham">
                        Giá Khám:
                        <span className="giakham">
                          {" "}
                          {this.state.giakham} vnđ
                        </span>
                      </div>
                    </div>
                    <div className="down">
                      <div className="luotxem">
                        <i className="fa-regular fa-calendar-day"></i>
                        Lượt hẹn khám: <b>{this.state.luothen}</b>
                      </div>
                      {this.state.show === true ? (
                        <div className="chiase">
                          <LikeandShareFB href={currentURL} />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="schedule-doctor">
                  <div className="content-left">
                    <DoctorSchedule
                      doctorIdFromParent={this.state.currentDoctorId}
                      handleActionFromParent={this.handleAction}
                      isOpenModalBookingParent={this.state.isOpenModalBooking}
                      isOpenModalThanhToanParent={
                        this.state.isOpenModalThanhToan
                      }
                      phong={this.phong}
                      ngay={this.ngay}
                      success={this.state.success}
                    />
                    {/* {this.state.openLogin === true ? (
                      <ModalLogin
                        openLogin={this.state.openLogin}
                        toggleFromParent={this.toggle}
                      />
                    ) : (
                      <div></div>
                    )} */}
                    <BookingModalThanhToan
                      isOpenModalThanhToanParent={
                        this.state.isOpenModalThanhToan
                      }
                      toggleFromParent={this.toggle}
                      phong={this.state.phong}
                      detailDoctor={this.state.detailDoctor}
                      handleSuccess={this.handleSuccess}
                      openLogin={this.openLogin}
                    />
                  </div>

                  {this.state.action === true ? (
                    <div className="bot animate__animated animate__fadeInDown">
                      <div className="text">
                        <i className="fas fa-check-circle"></i>&nbsp;
                        {detailDoctor.vienchucchuyenkhoa?.tenchuyenkhoa}
                        &nbsp; theo yêu cầu với BS.{detailDoctor.hoten}:
                        <b style={{ color: "#3161ad" }}>
                          {" "}
                          {this.state.giakham} vnđ
                        </b>
                      </div>

                      <div
                        className="btn-dat"
                        onClick={() => this.handleOpenThanhToan()}
                      >
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGeSURBVHgB3VXtUcMwDFV6DJANCBOQDTATUCZomKDdoNmgZQLYgHaCsEFhgmSDdAMj06dDVR3SpP/67nSK9WHJshQTXQuSPgPvfcpszuSYMqVqmLZMmyRJGhoLDrDy52GFZAYHyNUmH0xTpgyUY/2ubOqgo6Fgp6LPEUHrQYHYaMk0pwEIpWLaIVDVZ1zAcIf1FNkJLSBfGLlDIDnRQu87MXGW4K/gOR06SkguNzVyxx22Z/4C/Yw6TiEXXStZCdkatU9VeTLIA0rl00KWx06SgX9HctiHWUC2FDhmYx+x3aoqnAQR4RddhgY8iwWJQTLtGrRbOgOTSAbaUU41s/0fOooOv5qAT6W6p+MEj5xOLh5yPdWtalvB2tiLzlEMqjOckZdmYwlYGrsilihFNtMZV7pMqmXXHf6SSPFfkNyfolXzUdq5UL5vXaew3eXAN0x3dLjQEKCg7sTCYFawCZf9aG1uOnx/h42dG6ylhWX9xLrQeQ/YPIXuufcBM+Vq1Xemsq4jJa38kLfE//15JVBh9PLPqsAdjYUf88pdPX4AVkVhoJ7NOBsAAAAASUVORK5CYII="></img>
                        Đặt khám
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="detail-infor-doctor">
                <span>
                  <h2>
                    <b>
                      Thông tin của bác sĩ:
                      <hr />
                    </b>
                  </h2>
                </span>
                {detailDoctor && detailDoctor.contentHTML && (
                  <div
                    contentEditable="true"
                    dangerouslySetInnerHTML={{
                      __html: detailDoctor.contentHTML,
                    }}
                    style={{ pointerEvents: "none" }}
                  ></div>
                )}
              </div>
              <div className="footer">
                <HomeFooterNew />
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    // isLoggedIn: state.benhnhan.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
