import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import VienchucManage from "../containers/System/VienchucManage";
import TinhthanhManage from "../containers/System/Admin/TinhthanhManage";
import HuyenquanManage from "../containers/System/Admin/HuyenquanManage";
import XaphuongManage from "../containers/System/Admin/XaphuongManage";
import NhasxManage from "../containers/System/Admin/NhasxManage";
import TdhvManage from "../containers/System/Admin/TdhvManage";
import HoatchatManage from "../containers/System/Admin/HoatchatManage";
import VienchucRedux from "../containers/System/Admin/VienchucRedux";
import ChuyenkhoaRedux from "../containers/System/Admin/ChuyenkhoaRedux";
import PhongManage from "../containers/System/Admin/PhongManage";
import BuoiManage from "../containers/System/Admin/BuoiManage";
import ChucvuManage from "../containers/System/Admin/ChucvuManage";
import ThuocManage from "../containers/System/Admin/ThuocManage";
import Header from "../containers/Header/Header";
// import ManageDoctor from '../containers/System/Admin/ManageDoctor';
// import ManageThankinhSchedule from '../containers/System/Scheduler/ManageThankinhSchedule';
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/system/vienchuc-manage"
                component={VienchucManage}
              />
              <Route path="/system/vienchuc-redux" component={VienchucRedux} />
              <Route
                path="/system/tinhthanh-manage"
                component={TinhthanhManage}
              />
              <Route
                path="/system/huyenquan-manage"
                component={HuyenquanManage}
              />
              <Route
                path="/system/xaphuong-manage"
                component={XaphuongManage}
              />
              <Route path="/system/nhasx-manage" component={NhasxManage} />
              <Route path="/system/tdhv-manage" component={TdhvManage} />
              <Route
                path="/system/hoatchat-manage"
                component={HoatchatManage}
              />
              <Route
                path="/system/chuyenkhoa-redux"
                component={ChuyenkhoaRedux}
              />
              <Route path="/system/phong-manage" component={PhongManage} />
              <Route path="/system/buoi-manage" component={BuoiManage} />
              <Route path="/system/chucvu-manage" component={ChucvuManage} />
              <Route path="/system/thuoc-manage" component={ThuocManage} />
              {/* <Route path="/system/schedule-thankinh-manage" component={ManageThankinhSchedule} /> */}
              {/* <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-schedule" component={ManageSchedule} /> */}
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
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
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.vienchuc.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
