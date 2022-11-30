import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
// import ManagePatient from '../containers/System/Schedule/ManagePatient';
import Header from "../containers/Header/Header";
import ManageThankinhSchedule from "../containers/System/Scheduler/ManageThankinhSchedule";
import ManageCoxuongkhopSchedule from "../containers/System/Scheduler/ManageCoxuongkhopSchedule";
import ManageTieuhoaSchedule from "../containers/System/Scheduler/ManageTieuhoaSchedule";
import ManageTimmachSchedule from "../containers/System/Scheduler/ManageTimmachSchedule";
import ManageTaimuihongSchedule from "../containers/System/Scheduler/ManageTaimuihongSchedule";
class Schedule extends Component {
  render() {
    const { ScheduleMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="Schedule-container">
          <div className="Schedule-list">
            <Switch>
              <Route
                path="/schedule/schedule-thankinh-manage"
                component={ManageThankinhSchedule}
              />
              <Route
                path="/schedule/schedule-coxuongkhop-manage"
                component={ManageCoxuongkhopSchedule}
              />
              <Route
                path="/schedule/schedule-tieuhoa-manage"
                component={ManageTieuhoaSchedule}
              />
              <Route
                path="/schedule/schedule-timmach-manage"
                component={ManageTimmachSchedule}
              />
              <Route
                path="/schedule/schedule-taimuihong-manage"
                component={ManageTaimuihongSchedule}
              />
              <Route
                component={() => {
                  return <Redirect to={ScheduleMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ScheduleMenuPath: state.app.ScheduleMenuPath,
    isLoggedIn: state.vienchuc.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
