import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DataPicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { isEmpty, times } from "lodash";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  bulkCreateScheduele,
  getAllChuyenkhoaLichbacsikhamService,
  deleteLichbacsikhamService,
} from "../../../services/lichbacsikhamService";

import { getPhongChuyenkhoaIdService } from "../../../services/phongService";
import { getIdBuoiService } from "../../../services/buoiService";
import Paper from "@mui/material/Paper";
import TestSchedule from "./testSchedule";
import ModalSchedule from "./modalSchedule";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  // WeekView,
  // DayView,
  // Toolbar,
  // DateNavigator,
  // Appointments,
  // TodayButton,
  AppointmentTooltip,
  ConfirmationDialog,
  AppointmentForm,
  Scheduler,
  MonthView,
  DateNavigator,
  Toolbar,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { createLogger } from "redux-logger";
import { ThreeSixtySharp } from "@material-ui/icons";
import { touchRippleClasses } from "@mui/material";
const disabled = ["29-10-2022"];
const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#FFC107",
      borderRadius: "8px",
      width: "100px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.currentDateChange = (currentDate1) => {
      this.setState({ currentDate1 });
    };
    this.commitChanges = this.commitChanges.bind(this);
    // this.handleOnclickSchedule = this.handleOnclickSchedule.bind(this);
  }

  async componentDidMount() {
    this.props.fetchAllVienchucChuyenkhoaThankinh(this.state.idChuyenKhoa);
    this.props.fetchAllBuoi();
    this.props.fetchAllPhongChuyenkhoaThankinh(this.state.idChuyenKhoa);
    await this.props.fetchChuyenkhoaRedux();

    if (this.props.listChuyenkhoas) {
      this.state.idChuyenKhoa = this.props?.listChuyenkhoas[0]?.id;
      this.state.actionChooseKhoa =
        this.props?.listChuyenkhoas[0].tenchuyenkhoa;
    }
    await this.hamdata();
  }

  // hamdata = async (id, ten) => {
  //   this.setState(
  //     {
  //       selectedDoctor: {},
  //       selectedPhong: {},
  //       currentDate: "",
  //     },
  //     () => {
  //       if (this.state.rangeTime && this.state.rangeTime.length > 0) {
  //         this.state.rangeTime = this.state.rangeTime.map((item) => {
  //           item.isSelected = false;
  //           return item;
  //         });
  //         this.setState({
  //           rangeTime: this.state.rangeTime,
  //         });
  //       }
  //     }
  //   );
  //   if (ten !== undefined) {
  //     this.state.actionChooseKhoa = ten;
  //   }
  //   if (id === undefined) {
  //     let mang1 = await getAllChuyenkhoaLichbacsikhamService(
  //       this.state.idChuyenKhoa
  //     );
  //     this.props.fetchAllVienchucChuyenkhoaThankinh(this.state.idChuyenKhoa);
  //     this.props.fetchAllPhongChuyenkhoaThankinh(this.state.idChuyenKhoa);
  //     let tam = [];
  //     let tam2 = "";
  //     let giobd = "";
  //     let giokt = "";
  //     mang1.data.map((item, index) => {
  //       giobd = item.lichbacsikhambuoi.giobatdau;
  //       giokt = item.lichbacsikhambuoi.gioketthuc;
  //       this.setState({
  //         data1: {
  //           id: item.id,

  //           // item.ngay.slice(0, 10)
  //           startDate: moment(item.ngay).format("YYYY-MM-DD") + "T" + giobd,
  //           endDate: moment(item.ngay).format("YYYY-MM-DD")+ + "T" + giokt,
  //           title:
  //             "Bác sĩ: " +
  //             item.lichbacsikhamvienchuc.hoten.split(" ").slice(-1).join(" ") +
  //             " - " +
  //             "Phòng: " +
  //             item.lichbacsikhamphong.tenphong.split(" ").slice(-1).join(" "),
  //         },
  //       });

  //       tam.push(this.state.data1);
  //     });
  //     this.setState({
  //       data: tam,
  //       currentDate1: moment().format("YYYY-MM-DD"),
  //     });
  //   } else {
  //     this.setState({
  //       idChuyenKhoa: id,
  //     });
  //     let mang1 = await getAllChuyenkhoaLichbacsikhamService(id);
  //     this.props.fetchAllVienchucChuyenkhoaThankinh(this.state.idChuyenKhoa);
  //     this.props.fetchAllPhongChuyenkhoaThankinh(this.state.idChuyenKhoa);
  //     let tam = [];
  //     let tam2 = "";
  //     let giobd = "";
  //     let giokt = "";
  //     mang1.data.map((item, index) => {
  //       giobd = item.lichbacsikhambuoi.giobatdau;
  //       giokt = item.lichbacsikhambuoi.gioketthuc;
  //       this.setState({
  //         data1: {
  //           id: item.id,

  //           // item.ngay.slice(0, 10)
  //           startDate: moment(item.ngay).format("YYYY-MM-DD") + "T" + giobd,
  //           endDate: moment(item.ngay).format("YYYY-MM-DD") + "T" + giokt,
  //           title:
  //             "Bác sĩ: " +
  //             item.lichbacsikhamvienchuc.hoten.split(" ").slice(-1).join(" ") +
  //             " - " +
  //             "Phòng: " +
  //             item.lichbacsikhamphong.tenphong.split(" ").slice(-1).join(" "),
  //         },
  //       });

  //       tam.push(this.state.data1);
  //     });
  //     this.setState({
  //       data: tam,
  //       currentDate1: moment().format("YYYY-MM-DD"),
  //     });
  //   }
  // };

  hamdata = async (id, ten) => {
    this.setState(
      {
        selectedDoctor: {},
        selectedPhong: {},
        currentDate: "",
      },
      () => {
        if (this.state.rangeTime && this.state.rangeTime.length > 0) {
          this.state.rangeTime = this.state.rangeTime.map((item) => {
            item.isSelected = false;
            return item;
          });
          this.setState({
            rangeTime: this.state.rangeTime,
          });
        }
      }
    );
    if (ten !== undefined) {
      this.state.actionChooseKhoa = ten;
    }
    if (id === undefined) {
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
      mang1?.data?.map((item, index) => {
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
    } else {
      this.setState({
        idChuyenKhoa: id,
      }, () => {
        console.log("id chuyen khoa", this.state.idChuyenKhoa)
      });
      let mang1 = await getAllChuyenkhoaLichbacsikhamService(id);
      this.props.fetchAllVienchucChuyenkhoaThankinh(this.state.idChuyenKhoa);
      this.props.fetchAllPhongChuyenkhoaThankinh(this.state.idChuyenKhoa);
      let tam = [];
      let tam2 = "";
      let giobd = "";
      let giokt = "";
      let d = "";
      let m = "";
      let y = "";

      mang1?.data?.map((item, index) => {
        d = moment(item.ngay).format("DD");
        m = moment(item.ngay).format("MM");
        y = moment(item.ngay).format("YYYY");
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
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      }, () => {
        console.log("danh sch bac si", this.state.listDoctors)
      });
    }
    if (prevProps.allPhongs !== this.props.allPhongs) {
      let dataSelect1 = this.buildDataInputSelect1(this.props.allPhongs);
      this.setState({
        listPhongs: dataSelect1,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
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

  handleChangeSelect = async (selectedOption) => {
    console.log(selectedOption);
    this.setState({ selectedDoctor: selectedOption });
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

  handleChangeSelect1 = async (selectedOption) => {
    this.setState({ selectedPhong: selectedOption });
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

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id == time.id) item.isSelected = !item.isSelected;
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

  handleSaveSchedule = async (id) => {
    let {
      rangeTime,
      selectedDoctor,
      selectedPhong,
      currentDate,
      ghichu,
      idChuyenKhoa,
      time,
      test,
    } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Ngày không hợp lệ");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Bác sĩ đã chọn không hợp lệ");
      return;
    }

    // currentDate = moment().format("L");
    let formatedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.id_vienchuc = selectedDoctor.value;
          object.id_buoi = schedule.id;
          object.id_phong = selectedPhong.value;
          object.id_chuyenkhoa = idChuyenKhoa;
          object.ngay = formatedDate;
          object.ghichu = "";

          result.push(object);
        });
      } else {
        toast.error("Invalid selected doctor");
        return;
      }
    }

    let res = await bulkCreateScheduele({
      arrSchedule: result,
      id_vienchuc: selectedDoctor.value,
      id_phong: selectedPhong.value,
      ngay: formatedDate,
      idChuyenKhoa: idChuyenKhoa,
      ghichu: "",
      test: test,
    });

    if (res && res.errCode == 0) {
      this.setState({
        idChuyenKhoa: id,
      });
      toast.success("Tạo lịch bác sĩ thành công");
      this.setState({
        selectedDoctor: {},
        selectedPhong: {},
        currentDate: "",
        actionSang: false,
        actionChieu: false,
      });
      let { rangeTime } = this.state;

      rangeTime.map((item) => {
        item.isSelected = false;
      });

      this.hamdata();
    } else {
      toast.error("Tạo lịch bác sĩ thất bại");
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  commitChanges = async ({ added, changed, deleted }) => {
    if (deleted !== undefined) {
      let data = this.state.data;
      data = data.filter((appointment) => appointment.id === deleted);
      let res = await deleteLichbacsikhamService(data[0].id);
      if (res && res.errCode == 0) {
        toast.success("Xóa lịch bác sĩ thành công");
        this.hamdata();
      } else {
        toast.error("Xóa lịch bác sĩ thất bại");
      }
    }
  };

  handleOnclickSchedule = async (openModal) => {
    this.setState({
      openModal: openModal.open,
      idProps: openModal.id,
    });
  };
  toggleFromParent = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  handleChange = (check) => {
    if (check === true) {
      this.hamdata();
      check = false;
    }
  };
  render() {
    let { rangeTime, ghichu, actionChooseKhoa } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const { data, currentDate1 } = this.state;

    const schedulerData2 = [
      {
        id: 574,
        startDate: "2022-10-15T07:00",
        endDate: "2022-10-15T11:30",
        title: "Bác sĩ: Thảo - Phòng: 2",
      },

      {
        id: 575,
        startDate: "2022-10-15T13:00",
        endDate: "2022-10-15T17:00",
        title: "Bác sĩ: Thảo - Phòng: 2",
      },
    ];
    let listChuyenkhoas = this.props.listChuyenkhoas;

    return (
      <div>
        <div className="manage-schedule-container">
          <div className="m-s-title">Quản lý lịch khám của các bác sĩ</div>
          <div className="khung">
            <div className="name">
              <i className="far fa-calendar-alt"></i>
              Xếp Lịch
            </div>

            <div className="khung2">
              <div className="table1">
                <div className="name-khoa">Chọn Khoa</div>
                <div className="menu-doc">
                  {listChuyenkhoas &&
                    listChuyenkhoas.length > 0 &&
                    listChuyenkhoas.map((item, index) => {
                      let img =
                        "http://localhost:3002/Image/ChuyenKhoa/" +
                        item.imageName;
                      return (
                        <>
                          {actionChooseKhoa !== item.tenchuyenkhoa ? (
                            <div
                              className="khoa"
                              key={index}
                              // onClick={() => this.handleViewDetailSpecilty(item)}
                              onClick={() =>
                                this.hamdata(item.id, item.tenchuyenkhoa)
                              }
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
                          ) : (
                            <div
                              className="khoa-choose"
                              key={index}
                              // onClick={() => this.handleViewDetailSpecilty(item)}
                              onClick={() =>
                                this.hamdata(item.id, item.tenchuyenkhoa)
                              }
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
                                  style={{
                                    fontSize: "10px",
                                    color: "rgb(231, 24, 13)",
                                  }}
                                ></i>{" "}
                                <span style={{ color: "white" }}>
                                  Chuyên {item.tenchuyenkhoa}
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
              </div>
              <div className="table2">
                <div className="container">
                  <div className="row">
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="manage-schedule.choose-doctor" />
                      </label>
                      <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listDoctors}
                      />
                    </div>

                    <div className="col-6 form-group">
                      <label> Chọn Phòng</label>
                      <Select
                        value={this.state.selectedPhong}
                        onChange={this.handleChangeSelect1}
                        options={this.state.listPhongs}
                      />
                    </div>

                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="manage-schedule.choose-date" />
                      </label>
                      <DataPicker
                        onChange={this.handleOnchangeDatePicker}
                        className="form-control"
                        value={this.state.currentDate}
                        minDate={yesterday}
                        disabledValue={disabled}
                      />
                    </div>

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
                  </div>
                  <div className="col-12">
                    {/* lưu */}
                    <button
                      className="btn btn-primary btn-save-schedule"
                      onClick={() =>
                        this.handleSaveSchedule(this.state.idChuyenKhoa)
                      }
                    >
                      <FormattedMessage id="manage-schedule.save-info" />
                    </button>
                  </div>

                  <TestSchedule
                    handleOnclickSchedule={this.handleOnclickSchedule}
                    data={this.state.data}
                  />

                  <ModalSchedule
                    openSchedule={this.state.openModal}
                    toggleFromParent={this.toggleFromParent}
                    idProps={this.state.idProps}
                    changed={this.handleChange}
                  />
                </div>
              </div>
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
    allDoctors: state.admin.vienchucchuyenkhoathankinhs,
    allScheduleTime: state.admin.buois,
    allPhongs: state.admin.phongchuyenkhoathankinhs,

    //
    listChuyenkhoas: state.admin.chuyenkhoas,
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
