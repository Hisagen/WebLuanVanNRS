import React, { Component } from "react";
import { connect } from "react-redux";
import "./Xemlichkham.scss";
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
  getBacsiLichbacsikhamIdService,
} from "../../../services/lichbacsikhamService";

import { emitter } from "../../../utils/emitter";
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
class ManageThankinhSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      // moment().format('YYYY-MM-DD')
      // data: [],
      // currentDate: ''
      data1: "",
    };
    this.currentDateChange = (currentDate1) => {
      this.setState({ currentDate1 });
    };
  }

  hamdata = async (id) => {
    {
      let mang1 = await getBacsiLichbacsikhamIdService(id);
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
        tam.push(this.state.data1);
      });
      this.setState({
        data: tam,
        currentDate1: moment().format("YYYY-MM-DD"),
      });
    }
  };
  async componentDidMount() {
    let { vienchuc } = this.props;
    this.hamdata(vienchuc.id);
  }

  async componentDidUpdate(prevProps, presState, snapshot) {}

  render() {
    const { data, currentDate1 } = this.state;
    // let { schedulerData, currentDate } = this.state;
    return (
      <div>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            Quản lý lịch khám của các bác sĩ ở chuyên khoa thần kinh
          </div>
          <div className="container">
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
    vienchuc: state.vienchuc.vienchucInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageThankinhSchedule);
