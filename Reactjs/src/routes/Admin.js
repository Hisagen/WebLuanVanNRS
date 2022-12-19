import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePageAdmin from "../containers/System/Admin/HomePageAdmin/HomePageAdmin";
import HomeHeaderAdmin from "../containers/System/Admin/HomePageAdmin/HomeHeaderAdmin";
import HomeHeaderNhanVien from "../containers/System/Admin/HomePageAdmin/HomeHeaderNhanVien";
import HomeHeaderBacSi from "../containers/System/Admin/HomePageAdmin/HomeHeaderBacSi";
import { withRouter } from "react-router";

import VienchucRedux from "../containers/System/Admin/VienchucRedux";
import ManageSchedule from "../containers/System/Scheduler/ManageSchedule";
import PhongManage from "../containers/System/Admin/PhongManage";
import TangManage from "../containers/System/Admin/TangManage";
import ChuyenkhoaRedux from "../containers/System/Admin/ChuyenkhoaRedux";
import BuoiManage from "../containers/System/Admin/BuoiManage";
import ThuocManage from "../containers/System/Admin/ThuocManage";
import ChucvuManage from "../containers/System/Admin/ChucvuManage";
import HoatchatManage from "../containers/System/Admin/HoatchatManage";
import TdhvManage from "../containers/System/Admin/TdhvManage";
import TinhthanhManage from "../containers/System/Admin/TinhthanhManage";
import HuyenquanManage from "../containers/System/Admin/HuyenquanManage";
import XaphuongManage from "../containers/System/Admin/XaphuongManage";
// import NhasxManage from "../NhasxManage";
import NhasxManage from "../containers/System/Admin/NhasxManage";

import "./Admin.scss";
import XemLich from "../containers/System/Scheduler/XemLich";
import DatLich from "../containers/System/Scheduler/DatLich";
class Admin extends Component {
  constructor() {
    super();

    this.state = {
      action: false,
      id_chucvu: "",
    };
  }

  async componentDidMount() {
    setTimeout(() => {
      let items = JSON.parse(localStorage.getItem("persist:vienchuc"));
      let dataUser = JSON.parse(items?.vienchucInfo);
      if (dataUser?.id_chucvu) {
        this.setState({
          id_chucvu: dataUser?.id_chucvu,
        });
      } else {
        window.location.assign("/login");
      }
    }, 500);
  }

  handleAction = (action) => {
    this.setState({
      action: action,
    });
  };
  render() {
    return (
      <React.Fragment>
        {this.state?.id_chucvu == 4 ? (
          <div>
            <div>
              <HomeHeaderAdmin handleAction={this.handleAction} />
            </div>
            <div className="system-container">
              {this.state.action === true ? (
                <div className="content">
                  <Switch>
                    {/* <Route path="/system/homeAdmin" component={HomePageAdmin} /> */}
                    <Route
                      path="/system/HomeAdmin"
                      index
                      component={VienchucRedux}
                    />
                    <Route
                      path="/system/ChuyenKhoaRedux"
                      component={ChuyenkhoaRedux}
                    />

                    {/* <Route
                      path="/system/ManageSchedule"
                      component={ManageSchedule}
                    /> */}
                    <Route path="/system/PhongManage" component={PhongManage} />
                    <Route path="/system/TangManage" component={TangManage} />
                    {/* <Route path="/system/BuoiManage" component={BuoiManage} /> */}
                    {/* <Route path="/system/ThuocManage" component={ThuocManage} /> */}
                    {/* <Route
                      path="/system/ChucvuManage"
                      component={ChucvuManage}
                    /> */}
                    {/* <Route
                      path="/system/HoatchatManage"
                      component={HoatchatManage}
                    /> */}
                    <Route path="/system/TdhvManage" component={TdhvManage} />
                    <Route
                      path="/system/TinhthanhManage"
                      component={TinhthanhManage}
                    />
                    <Route
                      path="/system/HuyenquanManage"
                      component={HuyenquanManage}
                    />
                    <Route
                      path="/system/XaphuongManage"
                      component={XaphuongManage}
                    />
                    {/* <Route path="/system/NhasxManage" component={NhasxManage} /> */}

                    <Route
                      component={() => {
                        return <Redirect to={"/system/HomeAdmin"} />;
                      }}
                    />
                  </Switch>
                </div>
              ) : (
                <div className="content2">
                  <Switch>
                    <Route
                      path="/system/HomeAdmin"
                      index
                      component={VienchucRedux}
                    />
                    <Route
                      path="/system/ChuyenKhoaRedux"
                      component={ChuyenkhoaRedux}
                    />

                    <Route path="/system/PhongManage" component={PhongManage} />
                    {/* <Route path="/system/BuoiManage" component={BuoiManage} /> */}
                    {/* <Route path="/system/ThuocManage" component={ThuocManage} /> */}
                    {/* <Route
                      path="/system/ChucvuManage"
                      component={ChucvuManage}
                    /> */}
                    {/* <Route
                      path="/system/HoatchatManage"
                      component={HoatchatManage}
                    /> */}
                    <Route path="/system/TdhvManage" component={TdhvManage} />
                    <Route
                      path="/system/TinhthanhManage"
                      component={TinhthanhManage}
                    />
                    <Route
                      path="/system/HuyenquanManage"
                      component={HuyenquanManage}
                    />
                    <Route
                      path="/system/XaphuongManage"
                      component={XaphuongManage}
                    />
                    {/* <Route path="/system/NhasxManage" component={NhasxManage} /> */}
                    <Route
                      component={() => {
                        return <Redirect to={"/system/HomeAdmin"} />;
                      }}
                    />
                  </Switch>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {this.state.id_chucvu === 6 ? (
              <>
                <div>
                  <div>
                    <HomeHeaderNhanVien handleAction={this.handleAction} />
                  </div>
                  <div className="system-container">
                    {this.state.action === true ? (
                      <div className="content">
                        <Switch>
                          <Route
                            path="/system/ManageSchedule"
                            component={ManageSchedule}
                          />
                          <Route path="/system/DatLich" component={DatLich} />
                          <Route
                            component={() => {
                              return <Redirect to={"/system/ManageSchedule"} />;
                            }}
                          />
                        </Switch>
                      </div>
                    ) : (
                      <div className="content2">
                        <Switch>
                          <Route
                            path="/system/ManageSchedule"
                            component={ManageSchedule}
                          />
                          <Route path="/system/DatLich" component={DatLich} />
                          <Route
                            component={() => {
                              return <Redirect to={"/system/ManageSchedule"} />;
                            }}
                          />
                        </Switch>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div>
                    <HomeHeaderBacSi handleAction={this.handleAction} />
                  </div>
                  <div className="system-container">
                    {this.state.action === true ? (
                      <div className="content">
                        <Switch>
                          <Route path="/system/XemLich" component={XemLich} />

                          <Route
                            component={() => {
                              return <Redirect to={"/system/XemLich"} />;
                            }}
                          />
                        </Switch>
                      </div>
                    ) : (
                      <div className="content2">
                        <Switch>
                          <Route path="/system/XemLich" component={XemLich} />
                          <Route
                            component={() => {
                              return <Redirect to={"/system/XemLich"} />;
                            }}
                          />
                        </Switch>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.vienchuc.isLoggedIn,
    vienchucInfo: state.vienchuc.vienchucInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));
