import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useStore } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import Select from "react-select";
import moment from "moment";
import {
  bulkCreateScheduele,
  getAllChuyenkhoaLichbacsikhamService,
  deleteLichbacsikhamService,
  editLichbacsikhamService,
  kiemtraixoasuaLBSK,
} from "../../../services/lichbacsikhamService";
import DataPicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import { getlichbacsikhamtheoid } from "../../../services/lichbacsikhamService";
import { getPhongChuyenkhoaIdService } from "../../../services/phongService";

import "./modalSchedule.scss";
import * as actions from "../../../store/actions";
import { createGlobalStyle } from "styled-components";

class modalSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      detail: "",
      rangeTime: [],

      listDoctors: [],
      selectedDoctor: {},

      currentDate: "",
      rangeTime: [],
      listPhongs: [],
      selectedPhong: {},
      ghichu: "",
      listLichbacsikhams: [],
      data: [
        {
          startDate: "2022-05-09T07:00",
          endDate: "2022-05-09T07:30",
          title: "Sin",
        },
        {
          startDate: "2022-10-14T13:00",

          endDate: "2022-10-14T17:00",
          title: "Go to a gym",
        },
        {
          startDate: "2022-05-09T13:30",
          endDate: "2022-05-09T15:30",
          title: "An com",
        },
      ],
      currentDate1: "2022-05-09",
      data1: "",
      actionSang: false,
      actionChieu: false,
      idChuyenKhoa: "",
      actionChooseKhoa: "",
      time: "",
      test: "",
      openModal: false,
      idProps: "",
      disable: false,
      tontai: false,
    };
  }

  async componentDidMount() {
    this.setState({
      id: this.props.idProps,
    });
  }

  async componentDidUpdate(prevProps, presState, snapshot) {
    if (this.props.idProps !== presState.id) {
      this.setState(
        {
          id: this.props.idProps,
        },
        async () => {
          let check = await kiemtraixoasuaLBSK(this.state.id);
          if (check === true) {
            this.setState({
              tontai: true,
            });
          } else {
            this.setState({
              tontai: false,
            });
          }

          let res = await getlichbacsikhamtheoid(this.state.id);
          if (res.errCode === 0 && res.data) {
            this.setState(
              {
                detail: res.data,
                idChuyenKhoa: res.data.id_chuyenkhoa,
              },
              async () => {
                var today = new Date(),
                  date =
                    today.getFullYear() +
                    "-" +
                    (today.getMonth() + 1) +
                    "-" +
                    today.getDate();

                if (
                  new Date(this.state.detail.ngay).getTime() <
                  new Date(today).getTime()
                ) {
                  this.setState({
                    disable: true,
                  });
                } else {
                  this.setState({
                    disable: false,
                  });
                }
                this.props.fetchAllVienchucChuyenkhoaThankinh(
                  this.state.idChuyenKhoa
                );
                this.props.fetchAllBuoi();
                this.props.fetchAllPhongChuyenkhoaThankinh(
                  this.state.idChuyenKhoa
                );
                await this.props.fetchChuyenkhoaRedux();
                await this.hamdata(
                  this.state.detail.lichbacsikhamvienchuc.hoten,
                  this.state.detail.lichbacsikhamvienchuc.id,
                  this.state.detail.lichbacsikhamphong.tenphong,
                  this.state.detail.lichbacsikhamphong.id,
                  this.state.detail.ngay
                );
              }
            );
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
              listDoctors: dataSelect,
            });
            let dataSelect1 = this.buildDataInputSelect1(this.props.allPhongs);
            this.setState({
              listPhongs: dataSelect1,
            });
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
              data.map((item, index) => {
                if (item.id === this.state.detail.lichbacsikhambuoi.id) {
                  data[index].isSelected = true;
                  return item;
                } else {
                  data[index].isSelected = false;
                  return item;
                }
              });
              this.setState({
                rangeTime: data,
              });
            }
          }
        }
      );
    }
  }

  hamdata = async (tenbs, idbs, tenphong, idphong, ngay) => {
    this.setState({
      selectedDoctor: {
        label: tenbs,
        value: idbs,
      },
      selectedPhong: {
        label: tenphong,
        value: idphong,
      },
      currentDate: ngay,
    });

    let mang1 = await getAllChuyenkhoaLichbacsikhamService(
      this.state.idChuyenKhoa
    );
    this.props.fetchAllVienchucChuyenkhoaThankinh(this.state.idChuyenKhoa);
    this.props.fetchAllPhongChuyenkhoaThankinh(this.state.idChuyenKhoa);
    let tam = [];
    let tam2 = "";
    let giobd = "";
    let giokt = "";
    let d = "";
    let m = "";
    let y = "";
    mang1.data.map((item, index) => {
      d = moment(item.ngay).format("DD");
      m = moment(item.ngay).format("MM");
      y = moment(item.ngay).format("YYYY");
      giobd = item.lichbacsikhambuoi.giobatdau.slice(0, 2);
      giokt = item.lichbacsikhambuoi.gioketthuc.slice(0, 2);

      this.setState({
        data1: {
          id: item.id,

          start: new Date(y, m - 1, d, giobd),
          end: new Date(y, m - 1, d, giokt),
          title:
            "Bác sĩ: " +
            item.lichbacsikhamvienchuc.hoten.split(" ").slice(-1).join(" ") +
            " - " +
            "Phòng: " +
            item.lichbacsikhamphong.tenphong.split(" ").slice(-1).join(" "),
        },
      });

      tam.push(this.state.data1);
    });
    this.setState({
      data: tam,
      currentDate1: moment().format("YYYY-MM-DD"),
    });
  };
  toggle = () => {
    this.props.toggleFromParent();
  };

  buildDataInputSelect = (inputData) => {
    let result = [];

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.hoten;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  buildDataInputSelect1 = (inputData) => {
    let result = [];

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.tenphong;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id == time.id) {
          item.isSelected = !item.isSelected;
        } else {
          item.isSelected = false;
        }
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleClickBtnBuoi = (time) => {
    let { rangeTime } = this.state;
    if (time === "sang") {
      this.setState({
        time: time,
        actionSang: !this.state.actionSang,
      });
    } else {
      this.setState({
        time: time,
        actionChieu: !this.state.actionChieu,
      });
    }
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleUpdate = async () => {
    let { selectedDoctor, currentDate, selectedPhong, id, idChuyenKhoa } =
      this.state;
    console.log("this.sate.selectedDoctor", selectedDoctor);
    console.log("this.sate.currentDate", currentDate);
    console.log("this.sate.selectedPhong", selectedPhong);
    console.log("this.sate.id", id);
    if (selectedDoctor !== {} || selectedPhong !== {} || currentDate !== "") {
      let selectedTime = this.state.rangeTime.filter(
        (item) => item.isSelected === true
      );
      let formatedDate = new Date(currentDate).getTime();
      let res = await editLichbacsikhamService({
        id: id,
        id_buoi: selectedTime[0].id,
        id_phong: selectedPhong.value,
        id_vienchuc: selectedDoctor.value,
        ngay: formatedDate,
        id_chuyenkhoa: idChuyenKhoa,
      });

      console.log("res", res);
      if (res.errCode === 0) {
        toast.success("Sửa lịch bác sĩ thành công");
        this.props.toggleFromParent();
        this.props.changed(true);
      } else {
        toast.error("Sửa lịch bác sĩ thất bại");
      }
    }
    // this.props.toggleFromParent();
  };

  handleDelete = async () => {
    let res = await deleteLichbacsikhamService(this.state.id);
    if (res && res.errCode == 0) {
      toast.success("Xóa lịch bác sĩ thành công");
      this.props.toggleFromParent();
      this.props.changed(true);
    } else {
      toast.error("Xóa lịch bác sĩ thất bại");
    }
  };

  handleOnchangeDatePicker = async (date) => {
    let formatedDate = new Date(this.state.currentDate).getTime();
    let test = moment(this.state.currentDate).format("YYYY-MM-DD");

    this.setState({
      currentDate: date[0],
      test: test,
    });
    let { rangeTime, selectedDoctor, selectedPhong, currentDate, ghichu } =
      this.state;
    await getPhongChuyenkhoaIdService(
      this.state.idChuyenKhoa,
      formatedDate,
      selectedDoctor.value,
      selectedPhong.value
    );
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleChangeSelect1 = async (selectedOption) => {
    this.setState({ selectedPhong: selectedOption });
  };
  handleChangeSelectAlter = async () => {
    toast.error("bạn không thể sửa lịch làm việc này");
  };
  render() {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    let { rangeTime } = this.state;
    return (
      <Modal
        isOpen={this.props.openSchedule}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-schedule-container"}
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
          className="modal-thanhtoan-header animate__animated animate__slideInDown"
          style={{ color: "#4cc48b" }}
        >
          <span style={{ borderBottom: "1px solid #4cc48b" }}>Sắp lịch</span>
        </ModalHeader>
        <ModalBody>
          <div className="modal-schedule-body">
            <div
              className="container-trangthai"
              style={{
                fontWeight: "600",
                fontSize: "25px",
                marginBottom: "20px",
                color: "#4cc48b",
              }}
            >
              Sắp Lịch
            </div>

            <div>
              <span style={{ fontSize: "20px" }}>
                <span>Chuyên </span>
                {
                  this.state?.detail?.lichbacsikhamphong?.phongchuyenkhoa
                    ?.tenchuyenkhoa
                }
              </span>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-schedule.choose-doctor" />
                  </label>
                  {this.state.disable === true || this.state.tontai === true ? (
                    <Select
                      value={this.state.selectedDoctor}
                      onChange={this.handleChangeSelectAlter}
                      options={this.state.listDoctors}
                      disabled
                    />
                  ) : (
                    <Select
                      value={this.state.selectedDoctor}
                      onChange={this.handleChangeSelect}
                      options={this.state.listDoctors}
                    />
                  )}
                </div>

                <div className="col-6 form-group">
                  <label> Chọn Phòng</label>
                  {this.state.disable === true || this.state.tontai === true ? (
                    <Select
                      value={this.state.selectedPhong}
                      onChange={this.handleChangeSelectAlter}
                      options={this.state.listPhongs}
                    />
                  ) : (
                    <Select
                      value={this.state.selectedPhong}
                      onChange={this.handleChangeSelect1}
                      options={this.state.listPhongs}
                    />
                  )}
                </div>

                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="manage-schedule.choose-date" />
                  </label>
                  {this.state.disable === true || this.state.tontai === true ? (
                    <DataPicker
                      onChange={this.handleOnchangeDatePicker}
                      className="form-control"
                      value={this.state.currentDate}
                      minDate={yesterday}
                      disablefull={true}
                    />
                  ) : (
                    <DataPicker
                      onChange={this.handleOnchangeDatePicker}
                      className="form-control"
                      value={this.state.currentDate}
                      minDate={yesterday}
                    />
                  )}
                </div>

                {this.state.disable === true || this.state.tontai === true ? (
                  <div className="col-12 pick-hour-container">
                    {rangeTime &&
                      rangeTime.length > 0 &&
                      rangeTime.map((item, index) => {
                        if (item.isSelected === true) {
                          return (
                            <>
                              <button
                                className={"btn btn-schedule active"}
                                key={index}
                                onClick={() => this.handleClickBtnTime(item)}
                                disabled
                              >
                                {item.tenbuoi}
                              </button>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <button
                                className={"btn btn-schedule"}
                                key={index}
                                onClick={() => this.handleClickBtnTime(item)}
                                disabled
                              >
                                {item.tenbuoi}
                              </button>
                            </>
                          );
                        }
                      })}
                  </div>
                ) : (
                  <div className="col-12 pick-hour-container">
                    {this.state.rangeTime &&
                      this.state.rangeTime.length > 0 &&
                      this.state.rangeTime.map((item, index) => {
                        if (item.isSelected === true) {
                          return (
                            <>
                              <button
                                className={"btn btn-schedule active"}
                                key={index}
                                onClick={() => this.handleClickBtnTime(item)}
                              >
                                {item.tenbuoi}
                              </button>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <button
                                className={"btn btn-schedule"}
                                key={index}
                                onClick={() => this.handleClickBtnTime(item)}
                              >
                                {item.tenbuoi}
                              </button>
                            </>
                          );
                        }
                      })}
                  </div>
                )}
              </div>
              {this.state.disable === true || this.state.tontai === true ? (
                <div
                  style={{ marginTop: "10px", color: "red", fontSize: "20px" }}
                >
                  Lịch này không thể sửa{" "}
                </div>
              ) : null}
            </div>

            <div
              style={{ left: "50px", position: "absolute", marginTop: "20px" }}
            ></div>
          </div>
        </ModalBody>
        <ModalFooter>
          {this.state.disable === true || this.state.tontai === true ? (
            <Button
              className="btn-sua"
              color="primary"
              onKeyDown={(event) => this.handleKeyDown(event)}
              onClick={() => {
                this.handleUpdate();
              }}
              disabled
            >
              Sửa
            </Button>
          ) : (
            <Button
              className="btn-sua"
              color="primary"
              onKeyDown={(event) => this.handleKeyDown(event)}
              onClick={() => {
                this.handleUpdate();
              }}
            >
              Sửa
            </Button>
          )}
          {this.state.disable === true || this.state.tontai === true ? (
            <Button
              className="btn-xoa"
              color="primary"
              onKeyDown={(event) => this.handleKeyDown(event)}
              onClick={() => {
                this.handleDelete();
              }}
              disabled
            >
              Xóa
            </Button>
          ) : (
            <Button
              className="btn-xoa"
              color="primary"
              onKeyDown={(event) => this.handleKeyDown(event)}
              onClick={() => {
                this.handleDelete();
              }}
            >
              Xóa
            </Button>
          )}
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.vienchucchuyenkhoathankinhs,
    allScheduleTime: state.admin.buois,
    allPhongs: state.admin.phongchuyenkhoathankinhs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllVienchucChuyenkhoaThankinh: (id) =>
      dispatch(actions.fetchVienchucChuyenkhoaThankinhStart(id)),
    fetchAllBuoi: () => dispatch(actions.fetchAllBuoiStart()),
    fetchAllPhongChuyenkhoaThankinh: (id) =>
      dispatch(actions.fetchAllPhongChuyenkhoaThankinhStart(id)),
    fetchChuyenkhoaRedux: () => dispatch(actions.fetchAllChuyenkhoaStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(modalSchedule);
