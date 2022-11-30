import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { history } from "../../../../../src/redux";

import { FormattedMessage } from "react-intl";
import "./HomeHeaderAdmin.scss";
import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";
import * as actions from "../../../../store/actions";
import "animate.css";
import logo2 from "../../../../assets/logo2.png";
import avt from "../../../../assets/avt.jpg";
import StripeContainer from "../../../../components/StripeContainer";
import Content from "./Content";
import ManageSchedule from "../../Scheduler/ManageSchedule";
import VienchucRedux from "../../../../containers/System/Admin/VienchucRedux";
import PhongManage from "../../../../containers/System/Admin/PhongManage";
import ChuyenkhoaRedux from "../../../../containers/System/Admin/ChuyenkhoaRedux";
import BuoiManage from "../../../../containers/System/Admin/BuoiManage";
import ThuocManage from "../../../../containers/System/Admin/ThuocManage";
import ChucvuManage from "../../../../containers/System/Admin/ChucvuManage";
import HoatchatManage from "../../../../containers/System/Admin/HoatchatManage";
import TdhvManage from "../../../../containers/System/Admin/TdhvManage";
import TinhthanhManage from "../../../../containers/System/Admin/TinhthanhManage";
import HuyenquanManage from "../../../../containers/System/Admin/HuyenquanManage";
import XaphuongManage from "../../../../containers/System/Admin/XaphuongManage";

import "./App.css";
import NhasxManage from "../NhasxManage";
import { ThreeSixtySharp } from "@material-ui/icons";
import { border, style } from "@mui/system";
class HomeHeaderAdmin extends Component {
  constructor() {
    super();

    this.state = {
      action: false,
      link: "",
      url: "",
    };
  }
  handleAction = () => {
    this.setState(
      {
        action: !this.state.action,
      },
      () => {
        this.props.handleAction(this.state.action);
      }
    );
  };
  handleLink = (name) => {
    this.setState({
      link: name,
    });
  };

  handleOut = () => {
    this.props.processLogout();
    this.props.history.push(`/login`);
  };
  render() {
    let { link } = this.state;
    let { processLogout, isLoggedIn, vienchucInfo } = this.props;
    return (
      <>
        <div className="HomeHeaderAdmin">
          <div className="khung-header">
            {this.state.action && (
              <div className="table-doc animate__animated animate__fadeInLeft">
                <div className="avt animate__animated animate__bounce">
                  <img src={logo2}></img>
                </div>
                <div className="user">
                  <div className="avt-user">
                    <img src={avt}></img>
                  </div>
                  <div className="name-user">Nguyễn Ra Sin</div>
                </div>
                <hr />
                <div className="link">
                  {link === "TinhthanhManage" ? (
                    <Link
                      to={"/system/ManageSchedule"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("TinhthanhManage")}
                        className="active"
                      >
                        Quản lý Lịch
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/ManageSchedule"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("TinhthanhManage")}>
                        Quản lý Lịch
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}
            <div className="table1">
              <div onClick={() => this.handleAction()}>
                {this.state.action === false ? (
                  <i className="fas fa-align-justify"></i>
                ) : (
                  <i className="far fa-times-circle"></i>
                )}
              </div>
              <div>Home</div>
            </div>
            <div className="table2">
              <div>
                <i className="far fa-bell">
                  <div className="thongbao">
                    <span>2</span>
                  </div>
                </i>
              </div>

              <div onClick={() => this.handleOut()}>
                <i className="fas fa-sign-out-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.vienchuc.isLoggedIn,
    vienchucInfo: state.vienchuc.vienchucInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeaderAdmin)
);
