import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageThankinhSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import DataPicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { times } from "lodash";
import _ from "lodash";
import { toast } from "react-toastify";
import {
  bulkCreateScheduele,
  getAllChuyenkhoaLichbacsikhamService,
} from "../../../services/lichbacsikhamService";

// import * as React from 'react';
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
class ManageTieuhoaSchedule extends Component {
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
      data: [
        {
          startDate: "2022-05-09T07:00",
          endDate: "2022-05-09T07:30",
          title: "Long - phòng 5",
        },
        {
          startDate: "2022-05-09T12:00",
          endDate: "2022-05-09T13:30",
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
    };
    this.currentDateChange = (currentDate1) => {
      this.setState({ currentDate1 });
    };
  }

  componentDidMount() {
    this.props.fetchAllVienchucChuyenkhoaTieuhoa();
    this.props.fetchAllBuoi();
    this.props.fetchAllPhongChuyenkhoaTieuhoa();
    this.hamdata();
  }
  hamdata = async () => {
    {
      let mang1 = await getAllChuyenkhoaLichbacsikhamService(24);
      let tam = [];
      let tam2 = "";
      let giobd = "";
      let giokt = "";
      // mang1.data && mang1.data.length > 0 &&
      mang1.data.map((item, index) => {
        if (item.lichbacsikhambuoi.tenkhungio.length === 11) {
          giobd = item.lichbacsikhambuoi.tenkhungio.substring(0, 4);
          giokt = item.lichbacsikhambuoi.tenkhungio.substring(7, 12);
        }
        if (item.lichbacsikhambuoi.tenkhungio.length === 12) {
          giobd = item.lichbacsikhambuoi.tenkhungio.substring(0, 4);
          giokt = item.lichbacsikhambuoi.tenkhungio.substring(7, 13);
        }
        if (item.lichbacsikhambuoi.tenkhungio.length === 13) {
          giobd = item.lichbacsikhambuoi.tenkhungio.substring(0, 5);
          giokt = item.lichbacsikhambuoi.tenkhungio.substring(8, 14);
        }

        this.setState({
          data1: {
            startDate: moment(+item.ngay).format("YYYY-MM-DD") + "T" + giobd,
            endDate: moment(+item.ngay).format("YYYY-MM-DD") + "T" + giokt,
            title:
              "Bs." +
              item.lichbacsikhamvienchuc.hoten.split(" ").slice(-1).join(" ") +
              " - " +
              "P" +
              item.lichbacsikhamphong.tenphong.split(" ").slice(-1).join(" "),
          },
        });
        // let userObj = Object.assign({},this.state.data);
        // tam2 = Object.assign({}, this.state.data);
        // i = i + 1;
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
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        // let labelVi = `${item.lastName} ${item.firstName}`
        // let labelEn = `${item.firstName} ${item.lastName}`
        object.label = item.hoten;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };

  buildDataInputSelect1 = (inputData) => {
    let result = [];
    // let { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        // let labelVi = `${item.lastName} ${item.firstName}`
        // let labelEn = `${item.firstName} ${item.lastName}`
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

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
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

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, selectedPhong, currentDate, ghichu } =
      this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Ngày không hợp lệ");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Bác sĩ đã chọn không hợp lệ");
      return;
    }

    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.id_vienchuc = selectedDoctor.value;
          object.id_phong = selectedPhong.value;
          object.ngay = formatedDate;
          object.id_buoi = schedule.id;
          object.ghichu = ghichu;
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
      ghichu: ghichu,
    });
    if (res && res.errCode == 0) {
      toast.success("Tạo lịch bác sĩ thành công");
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
  render() {
    let { rangeTime, ghichu } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const { data, currentDate1 } = this.state;
    return (
      <div>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  {" "}
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
                <label style={{ marginTop: "10px" }}>Ghi chú</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "ghichu");
                  }}
                  value={this.state.ghichu}
                  style={{ width: "640px" }}
                ></input>
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
                />
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule"
                        }
                        key={index}
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {item.tenkhungio}
                      </button>
                    );
                  })}
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save-info" />
              </button>
            </div>
            <Paper style={{ marginTop: "50px", marginBottom: "50px" }}>
              <Scheduler data={data} height={660}>
                <ViewState
                  currentDate={currentDate1}
                  onCurrentDateChange={this.currentDateChange}
                />
                <WeekView startDayHour={6.5} endDayHour={17.5} />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
              </Scheduler>
            </Paper>
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
    allDoctors: state.admin.vienchucchuyenkhoatieuhoas,
    allScheduleTime: state.admin.buois,
    allPhongs: state.admin.phongchuyenkhoatieuhoas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllVienchucChuyenkhoaTieuhoa: () =>
      dispatch(actions.fetchVienchucChuyenkhoaTieuhoaStart()),
    fetchAllBuoi: () => dispatch(actions.fetchAllBuoiStart()),
    fetchAllPhongChuyenkhoaTieuhoa: () =>
      dispatch(actions.fetchAllPhongChuyenkhoaTieuhoaStart()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTieuhoaSchedule);
