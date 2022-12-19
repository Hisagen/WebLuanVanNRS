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
import {
  getNgayBacsiLichbacsikhamIdService,
  countDangky,
} from "../../../services/lichbacsikhamService";
import { getPhongChuyenkhoaIdService } from "../../../services/phongService";
import { getAllBenhnhanService } from "../../../services/benhnhanService";
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
      listBenhNhan: [],
      selectedBN: "",

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
    this.currentDateChange = (currentDate1) => {
      this.setState({ currentDate1 });
    };
    this.commitChanges = this.commitChanges.bind(this);
    // this.handleOnclickSchedule = this.handleOnclickSchedule.bind(this);
  }

  async componentDidMount() {
    this.props.fetchAllVienchucChuyenkhoaThankinh(this.state.idChuyenKhoa);
    this.props.fetchAllBuoi();
    let allBN = await getAllBenhnhanService();
    if (allBN && allBN.data) {
      let dataSelect1 = this.buildDataInputSelect1(allBN.data);
      this.setState({
        listBenhNhan: dataSelect1,
      });
    }

    await this.props.fetchChuyenkhoaRedux();

    if (this.props.listChuyenkhoas) {
      this.state.idChuyenKhoa = this.props?.listChuyenkhoas[0]?.id;
      this.state.actionChooseKhoa =
        this.props?.listChuyenkhoas[0].tenchuyenkhoa;
    }
    await this.hamdata();

    let allday = this.getArrDays();
    this.setState({
      allDays: allday,
    });
  }

  hamdata = async (id, ten) => {
    if (ten !== undefined) {
      this.state.actionChooseKhoa = ten;
    }
    if (id === undefined) {
      let mang1 = await getAllChuyenkhoaLichbacsikhamService(
        this.state.idChuyenKhoa
      );
      this.props.fetchAllVienchucChuyenkhoaThankinh(this.state.idChuyenKhoa);
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
      });
      let mang1 = await getAllChuyenkhoaLichbacsikhamService(id);
      this.props.fetchAllVienchucChuyenkhoaThankinh(this.state.idChuyenKhoa);
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

  getArrDays = () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
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
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    return allDays;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
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
        object.label = item.hoten;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChangeSelect1 = async (selectedOption) => {
    this.setState({ selectedBN: selectedOption });
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
    console.log("id lịch", openModal);
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
                      <label> Chọn Bệnh Nhân</label>
                      <Select
                        value={this.state.selectedBN}
                        onChange={this.handleChangeSelect1}
                        options={this.state.listBenhNhan}
                      />
                    </div>

                    <div className="all-schedule">
                      <select
                        onChange={(event) => this.handleOnChangeSelect(event)}
                      >
                        {this.state.allDays &&
                          this.state.allDays.length > 0 &&
                          this.state.allDays.map((item, index) => {
                            return (
                              <option value={item.value} key={item.id}>
                                {item.label}
                              </option>
                            );
                          })}
                      </select>
                    </div>
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
                                    onClick={() =>
                                      this.handleClickSchedule(item)
                                    }
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
                                    onClick={() =>
                                      this.handleClickSchedule(item)
                                    }
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

                  {/* <TestSchedule
                    handleOnclickSchedule={this.handleOnclickSchedule}
                    data={this.state.data}
                  />

                  <ModalSchedule
                    openSchedule={this.state.openModal}
                    toggleFromParent={this.toggleFromParent}
                    idProps={this.state.idProps}
                    changed={this.handleChange}
                  /> */}
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
