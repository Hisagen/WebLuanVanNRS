import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import "./DetailSpecialty.scss";
// import "../../../components/CustomScrollbars.scss";
import "./customSrcollbars.css";
import HomeHeaderNew from "../../Auth/HomePageNew/HomeHeaderNew";
import { withRouter } from "react-router";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import BookingModalThanhToan from "../../../containers/Patient/Doctor/Modal/BookingModalThanhToan";
import { getChuyenkhoaIdService } from "../../../services/chuyenkhoaService";
import { getVienchucChuyenkhoaIdService1 } from "../../../services/vienchucService";
import { getBacsiIdService } from "../../../services/vienchucService";
import { getAllChuyenkhoaService } from "../../../services/chuyenkhoaService";
import { checkDangKy } from "../../../services/dangkyService";
import HomeFooterNew from "../../Auth/HomePageNew/HomeFooterNew";
import { toast } from "react-toastify";

import _ from "lodash";
import { createGlobalStyle } from "styled-components";
import { createLogger } from "redux-logger";
import { Link } from "react-router-dom";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
      dataDetailSpecialty: {},
      action: false,
      isOpenModalThanhToan: false,
      giakhamchuyenkhoa: "",
      dataSpeciatly: [],
      success: "",
      check: false,
      id: "",
      currentPage: 1,
      newsPerPage: 2,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id1 = this.props.match.params.id;
      this.setState({
        id: id1,
      });
      let res = await getChuyenkhoaIdService({
        id: id1,
      });
      if (res && res.errCode === 0) {
        this.setState({
          dataDetailSpecialty: res.data,
        });
      }
      let res1 = await getVienchucChuyenkhoaIdService1({
        id_chuyenkhoa: id1,
      });

      if (res1 && res1.errCode === 0) {
        this.setState({
          arrDoctor: res1.data,
          giakhamchuyenkhoa: res1.giakham,
        });

        let allChuyenKhoa = await getAllChuyenkhoaService();
        if (allChuyenKhoa && allChuyenKhoa.errCode == 0) {
          this.setState({
            dataSpeciatly: allChuyenKhoa.data ? allChuyenKhoa.data : [],
          });
        }
      }
    }
  }
  //hàm dùng để in hoa kí tự đầu tiên
  async componentDidUpdate(prevProps, presState, snapshot) {}

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
  ngay = (ngay) => {};
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
  handleViewDetailSpecilty = (chuyenkhoa) => {
    if (
      window.location.pathname !== `/api/get-id-chuyenkhoa/${chuyenkhoa.id}`
    ) {
      if (this.props.history) {
        this.props.history.push(`/api/get-id-chuyenkhoa/${chuyenkhoa.id}`);

        window.location.reload();
      }
    }
  };
  handleSuccess = (success) => {
    this.setState({
      success: success,
    });
  };
  dangxuat = (check) => {
    if (check === true) {
      this.setState({
        check: false,
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
      });
    }
  };
  formatCash(str) {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  }
  chosePage = (event) => {
    console.log("event.target.id", event.target.id);
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  select = (event) => {
    console.log("type event", typeof event.target.value);
    this.setState({
      newsPerPage: event.target.value,
    });
  };
  render() {
    let { arrDoctor, dataDetailSpecialty, giakhamchuyenkhoa, dataSpeciatly } =
      this.state;
    let all = arrDoctor.length.toString();
    let imageBase64 = "";
    if (dataDetailSpecialty && dataDetailSpecialty.imageName) {
      {
        imageBase64 =
          "http://localhost:3002/Image/ChuyenKhoa/" +
          dataDetailSpecialty.imageName;
      }
    }
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = arrDoctor.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <DetailSpecialty
          stt={index + 1 + (currentPage - 1) * newsPerPage}
          key={index}
          arrDoctor={item}
        />
      );
    });
    console.log("renderTodos", renderTodos);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrDoctor.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="detal-specialty-container">
        <HomeHeaderNew dangxuat={this.dangxuat} dangnhap={this.dangnhap} />

        <div className="container-specialty">
          <div className="thongtin-chuyenkhoa">
            <div className="img">
              <img src={imageBase64}></img>
            </div>
            <div
              style={{
                position: "absolute",
                fontSize: "20px",
                marginTop: "55px",
                marginLeft: "130px",
              }}
            >
              Danh Sách Chuyên Khoa
            </div>
            <div className="menu-doc">
              {dataSpeciatly &&
                dataSpeciatly.length > 0 &&
                dataSpeciatly.map((item, index) => {
                  let img =
                    "http://localhost:3002/Image/ChuyenKhoa/" + item.imageName;
                  return (
                    <div
                      className="khoa"
                      key={index}
                      onClick={() => this.handleViewDetailSpecilty(item)}
                    >
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${img})` }}
                      ></div>
                      <div
                        style={{
                          marginTop: "20px",
                          marginLeft: "20px",
                          paddingTop: "20px",
                          fontWeight: "500",
                          height: "auto",
                          fontSize: "12px",
                          width: "200px",
                          color: "#24ac7c",
                        }}
                      >
                        <i
                          class="fas fa-plus-square"
                          style={{ fontSize: "10px", color: "gray" }}
                        ></i>{" "}
                        Chuyên {item.tenchuyenkhoa}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="ten-ck">
              Chuyên {dataDetailSpecialty?.tenchuyenkhoa}
            </div>
          </div>

          <div className="desciption-specialty-body">
            {renderTodos &&
              renderTodos.length > 0 &&
              renderTodos.map((item, index) => {
                console.log("item", item.props.arrDoctor);
                return (
                  <div className="each-doctor" key={index}>
                    <div className="dt-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          id_vienchuc={item?.props?.arrDoctor.id}
                          isShowDescriptionDoctor={true}
                          isShowLinkDetail={true}
                          // dataTime={item?.props.arrDoctor}
                        />
                      </div>
                    </div>
                    <div className="dt-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule
                          doctorIdFromParent={item?.props?.arrDoctor.id}
                          handleActionFromParent={this.handleAction}
                          isOpenModalBookingParent={
                            this.state.isOpenModalBooking
                          }
                          isOpenModalThanhToanParent={
                            this.state.isOpenModalThanhToan
                          }
                          phong={this.phong}
                          ngay={this.ngay}
                        />

                        <BookingModalThanhToan
                          isOpenModalThanhToanParent={
                            this.state.isOpenModalThanhToan
                          }
                          toggleFromParent={this.toggle}
                          phong={this.state.phong}
                          detailDoctor={item?.props.arrDoctor}
                          handleSuccess={this.handleSuccess}
                        />
                        {item?.props.arrDoctor.id ===
                          this.state?.phong?.lichkhamlichbacsikham
                            ?.id_vienchuc && this.state.action === true ? (
                          <div
                            className="bot animate__animated animate__fadeInDown"
                            key={index}
                          >
                            <div className="text">
                              <i className="fas fa-check-circle"></i>&nbsp;
                              {
                                item?.props.arrDoctor.vienchucchuyenkhoa
                                  ?.tenchuyenkhoa
                              }
                              &nbsp; theo yêu cầu với BS.
                              {item?.props.arrDoctor.hoten}:
                              <b style={{ color: "#3161ad" }}>
                                {" "}
                                {this.formatCash(
                                  giakhamchuyenkhoa.gia_bhyt.toString()
                                )}{" "}
                                vnđ
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
                  </div>
                );
              })}

            <div className="khung-page">
              {/* <div className="pagination-custom">
                {pageNumbers.map((number) => {
                  if (this.state.currentPage === number) {
                    return (
                      <table>
                        <tbody>
                          <tr>
                            <th
                              key={number}
                              id={number}
                              className="phantrang active"
                            >
                              {number}
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    );
                  } else {
                    return (
                      <table>
                        <tbody>
                          <tr>
                            <th
                              key={number}
                              id={number}
                              onClick={this.chosePage}
                              className="phantrang"
                            >
                              {number}
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    );
                  }
                })}
              </div> */}
              <div className="news-per-page">
                <span>Page size: </span>
                <select
                  defaultValue="0"
                  onChange={this.select}
                  style={{
                    width: "70px",
                    height: "27px",
                    textAlign: "center",
                    background: "rgb(247, 245, 245)",
                  }}
                >
                  {/* <option value="0" disabled></option> */}
                  <option value={all}>All</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <HomeFooterNew />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
