import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import {
  getNgayBacsiLichbacsikhamIdService,
  countDangky,
} from "../../../services/lichbacsikhamService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
import BookingModal_DN from "./Modal/BookingModal_DN";
import { Redirect } from "react-router-dom";
// import { history } from '../../../redux'
import { withRouter } from "react-router";

import { createDangkyService } from "../../../services/dangkyService";
import { createLichkhamService } from "../../../services/lichkhamService";
import { postPatientBookAppoinment } from "../../../services/benhnhanService";
import { toast } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import logger from "redux-logger";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModalBooking: false,
      isOpenModalBooking_DN: false,
      dataScheduleTimeModal: {},
      ngay: "",
      active: "",
      action: false,
      time: "",
      sang: [],
      chieu: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    this.setState(
      {
        allDays: allDays,
      },
      async () => {
        let res = await getNgayBacsiLichbacsikhamIdService(
          this.props.doctorIdFromParent,
          allDays[0].value
        );
        if (res && res.errCode === 0 && res.data != []) {
          let total = res.data[res.data.length - 1];
          let tempsang = [];
          let tempchieu = [];
          let temp = [];
          if (total && total.length === 2) {
            if (total[0].length === 8) {
              tempchieu = total[0].concat(tempchieu);
              for (let i = 0; i < tempchieu.length; i++) {
                let test = await countDangky(tempchieu[i].id);
                tempchieu[i].soluongdangky = test;
              }
              this.setState({
                chieu: tempchieu,
              });
            } else {
              tempsang = total[0].concat(tempsang);
              for (let i = 0; i < tempsang.length; i++) {
                let test = await countDangky(tempsang[i].id);
                tempsang[i].soluongdangky = test;
              }
              this.setState({
                sang: tempsang,
              });
            }

            if (total[1].length === 9) {
              tempsang = total[1].concat(tempsang);
              for (let i = 0; i < tempsang.length; i++) {
                let test = await countDangky(tempsang[i].id);
                tempsang[i].soluongdangky = test;
              }
              this.setState({
                sang: tempsang,
              });
            } else {
              tempchieu = total[1].concat(tempchieu);
              for (let i = 0; i < tempchieu.length; i++) {
                let test = await countDangky(tempchieu[i].id);
                tempchieu[i].soluongdangky = test;
              }
              this.setState({
                chieu: tempchieu,
              });
            }
          } else if (total && total.length === 1) {
            let tempsang = [];
            let tempchieu = [];
            if (total[0].length === 8) {
              tempchieu = total[0].concat(tempchieu);
              for (let i = 0; i < tempchieu.length; i++) {
                let test = await countDangky(tempchieu[i].id);
                tempchieu[i].soluongdangky = test;
              }
              this.setState({
                chieu: tempchieu,
                sang: [],
              });
            } else {
              tempsang = total[0].concat(tempsang);
              for (let i = 0; i < tempsang.length; i++) {
                let test = await countDangky(tempsang[i].id);
                tempsang[i].soluongdangky = test;
              }
              this.setState({
                sang: tempsang,
                chieu: [],
              });
            }
          }
        }
      }
    );
  }

  //hàm dùng để in hoa kí tự đầu tiên
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async componentDidUpdate(prevProps, presState, snapshot) {
    if (this.props.success === "success") {
    }
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getNgayBacsiLichbacsikhamIdService(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      // this.setState({
      //   allAvalableTime: res.data ? res.data[res.data.length - 1] : [],
      // });
    }
  }

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, "days").format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).add(i, "days").format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };

  getNgay = (a) => {
    let allDays = "";
    let object = {};
    let labelVi = moment(new Date()).add(a, "days").format("dddd - DD/MM");
    object.label = this.capitalizeFirstLetter(labelVi);
    object.value = moment(new Date()).add(a, "days").startOf("day").valueOf();
    allDays = object;
    return allDays;
  };

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;

      let date1 = event.target.selectedIndex;

      let date2 = this.getNgay(date1);

      this.setState(
        {
          ngay: date2.label,
        },
        () => {
          this.props.ngay(this.state.ngay);
          this.props.handleActionFromParent(false);
        }
      );
      let res = await getNgayBacsiLichbacsikhamIdService(doctorId, date);
      console.log("ressssssssssssss", res);
      if (res.errCode === 0 && res.data.length !== 0) {
        let total = res.data[res.data.length - 1];
        let tempsang = [];
        let tempchieu = [];
        if (total && total.length === 2) {
          if (total[0].length === 8) {
            tempchieu = total[0].concat(tempchieu);
            for (let i = 0; i < tempchieu.length; i++) {
              let test = await countDangky(tempchieu[i].id);
              tempchieu[i].soluongdangky = test;
            }
            this.setState({
              chieu: tempchieu,
            });
          } else {
            tempsang = total[0].concat(tempsang);
            for (let i = 0; i < tempsang.length; i++) {
              let test = await countDangky(tempsang[i].id);
              tempsang[i].soluongdangky = test;
            }
            this.setState({
              sang: tempsang,
            });
          }
          if (total[1].length === 9) {
            tempsang = total[1].concat(tempsang);
            for (let i = 0; i < tempsang.length; i++) {
              let test = await countDangky(tempsang[i].id);
              tempsang[i].soluongdangky = test;
            }
            this.setState({
              sang: tempsang,
            });
          } else {
            tempchieu = total[1].concat(tempchieu);
            for (let i = 0; i < tempchieu.length; i++) {
              let test = await countDangky(tempchieu[i].id);
              tempchieu[i].soluongdangky = test;
            }
            this.setState({
              chieu: tempchieu,
            });
          }
        } else if (total && total.length === 1) {
          let tempsang = [];
          let tempchieu = [];
          if (total[0].length === 8) {
            tempchieu = total[0].concat(tempchieu);
            for (let i = 0; i < tempchieu.length; i++) {
              let test = await countDangky(tempchieu[i].id);
              tempchieu[i].soluongdangky = test;
            }
            this.setState({
              chieu: tempchieu,
              sang: [],
            });
          } else {
            tempsang = total[0].concat(tempsang);
            for (let i = 0; i < tempsang.length; i++) {
              let test = await countDangky(tempsang[i].id);
              tempsang[i].soluongdangky = test;
            }
            this.setState({
              sang: tempsang,
              chieu: [],
            });
          }
        }
      } else {
        this.setState({
          sang: [],
          chieu: [],
        });
      }
    }
  };

  handleClickScheduleTime = async (time) => {
    let isLoggedInBN = this.props.isLoggedInBN;
    if (isLoggedInBN !== true) {
      this.setState({
        isOpenModalBooking: true,
        dataScheduleTimeModal: time,
      });
    } else {
      this.setState({
        isOpenModalBooking_DN: true,
        dataScheduleTimeModal: time,
      });
    }
  };

  closeBookingClose = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  closeBookingClose1 = () => {
    this.setState({
      isOpenModalBooking_DN: false,
    });
  };

  handleClickSchedule = async (time) => {
    this.setState(
      {
        active: time.id,
        action: true,
        dataScheduleTimeModal: time,
        time: time,
      },
      () => {
        this.props.handleActionFromParent(this.state.action);
        this.props.phong(time);
      }
    );
  };

  handleClickScheduleChoose = async (time) => {
    this.setState(
      {
        active: "",
        action: false,
      },
      () => {
        this.props.handleActionFromParent(this.state.action);
      }
    );
  };

  render() {
    let {
      allDays,
      allAvalableTime,
      isOpenModalBooking,
      isOpenModalBooking_DN,
      dataScheduleTimeModal,
      ngay,
    } = this.state;
    let { isOpenModalBookingParent } = this.props;

    if (isOpenModalBookingParent === true) {
      isOpenModalBooking_DN = true;
    }
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={item.id}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-avaiable-time">
            <div className="text-celendar">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {this.state.sang &&
              this.state.sang.length === 0 &&
              this.state.chieu &&
              this.state.chieu.length === 0 ? (
                <div className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />{" "}
                </div>
              ) : null}
              {this.state.sang && this.state.sang.length > 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    marginBottom: "20px",
                    fontWeight: "600",
                    background: "#64b5f6",
                    color: "white",
                  }}
                >
                  <span>Buổi sáng</span>
                </div>
              ) : null}
              {this.state.sang && this.state.sang.length > 0 ? (
                <>
                  <div className="time-content-button">
                    {this.state.sang.map((item, index) => {
                      let timeDisplay = item.khunggio;
                      if (this.state.active === item?.id) {
                        return (
                          <div className="btn">
                            <div
                              key={index}
                              className="btn-time-choose"
                              // onClick={() => this.handleClickScheduleTime(item)}
                              onClick={() =>
                                this.handleClickScheduleChoose(item)
                              }
                            >
                              <span>{timeDisplay}</span>
                            </div>
                          </div>
                        );
                      } else if (item.soluongdangky >= 2) {
                        return (
                          <div className="btn" title="Hết chỗ">
                            <div
                              className="btn-time-block"
                              style={{ cursor: "not-allowed" }}
                            >
                              <span>{timeDisplay}</span>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="btn">
                            <div
                              key={index}
                              className="btn-time"
                              // onClick={() => this.handleClickScheduleTime(item)}
                              onClick={() => this.handleClickSchedule(item)}
                            >
                              <span>{timeDisplay}</span>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </>
              ) : null}

              {this.state.chieu && this.state.chieu.length > 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    marginBottom: "20px",
                    marginTop: "50px",
                    fontWeight: "600",
                    background: "#64b5f6",
                    color: "white",
                  }}
                >
                  Buổi chiều
                </div>
              ) : (
                <div></div>
              )}
              {this.state.chieu && this.state.chieu.length > 0 ? (
                <>
                  <div className="time-content-button">
                    {this.state.chieu.map((item, index) => {
                      let timeDisplay = item.khunggio;
                      if (this.state.active === item?.id) {
                        return (
                          <div className="btn">
                            <div
                              key={index}
                              className="btn-time-choose"
                              // onClick={() => this.handleClickScheduleTime(item)}
                              onClick={() =>
                                this.handleClickScheduleChoose(item)
                              }
                            >
                              <span>{timeDisplay}</span>
                            </div>
                          </div>
                        );
                      } else if (item.soluongdangky >= 2) {
                        return (
                          <div className="btn" title="Hết chỗ">
                            <div className="btn-time-block">
                              <span>{timeDisplay}</span>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="btn">
                            <div
                              key={index}
                              className="btn-time"
                              // onClick={() => this.handleClickScheduleTime(item)}
                              onClick={() => this.handleClickSchedule(item)}
                            >
                              <span>{timeDisplay}</span>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
        {/* <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTimeModal}
          ngay={ngay}
        /> */}
        {/* <BookingModal_DN
          isOpenModal={isOpenModalBooking_DN}
          closeBookingClose={this.closeBookingClose1}
          dataTime={dataScheduleTimeModal}
          ngay={ngay}
        /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    benhnhanInfo: state.benhnhan.benhnhanInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
);
