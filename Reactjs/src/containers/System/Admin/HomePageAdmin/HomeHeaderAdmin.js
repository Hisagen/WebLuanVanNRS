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
                {/* Link */}
                <div className="link">
                  {link === "VienChucRedux" ? (
                    <Link
                      to={"/system/homeAdmin"}
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <div
                        onClick={() => this.handleLink("VienChucRedux")}
                        className="active"
                      >
                        Quản lý viên chức
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/homeAdmin"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("VienChucRedux")}>
                        Quản lý viên chức
                      </div>
                    </Link>
                  )}

                  {link === "ChuyenKhoaRedux" ? (
                    <Link
                      to={"/system/ChuyenKhoaRedux"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("ChuyenKhoaRedux")}
                        className="active"
                      >
                        Quản lý chuyên khoa
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/ChuyenKhoaRedux"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("ChuyenKhoaRedux")}>
                        Quản lý chuyên khoa
                      </div>
                    </Link>
                  )}

                  {link === "TangManage" ? (
                    <Link
                      to={"/system/TangManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("TangManage")}
                        className="active"
                      >
                        Quản lý tầng
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/TangManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("TangManage")}>
                        Quản lý tầng
                      </div>
                    </Link>
                  )}

                  {link === "PhongManage" ? (
                    <Link
                      to={"/system/PhongManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("PhongManage")}
                        className="active"
                      >
                        Quản lý phòng khám
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/PhongManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("PhongManage")}>
                        Quản lý phòng khám
                      </div>
                    </Link>
                  )}
                  {/* 
                  {link === "BuoiManage" ? (
                    <Link
                      to={"/system/BuoiManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("BuoiManage")}
                        className="active"
                      >
                        Quản lý buổi
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/BuoiManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("BuoiManage")}>
                        Quản lý buổi
                      </div>
                    </Link>
                  )} */}

                  {/* {link === "ThuocManage" ? (
                    <Link
                      to={"/system/ThuocManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("ThuocManage")}
                        className="active"
                      >
                        Quản lý thuốc
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/ThuocManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("ThuocManage")}>
                        Quản lý thuốc
                      </div>
                    </Link>
                  )} */}
                  {/* {link === "ChucvuManage" ? (
                    <Link
                      to={"/system/ChucvuManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("ChucvuManage")}
                        className="active"
                      >
                        Quản lý chức vụ
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/ChucvuManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("ChucvuManage")}>
                        Quản lý chức vụ
                      </div>
                    </Link>
                  )} */}

                  {/* {link === "HoatchatManage" ? (
                    <Link
                      to={"/system/HoatchatManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("HoatchatManage")}
                        className="active"
                      >
                        Quản lý hoạt chất
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/HoatchatManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("HoatchatManage")}>
                        Quản lý hoạt chất
                      </div>
                    </Link>
                  )} */}
                  {/* 
                  {link === "NhasxManage" ? (
                    <Link
                      to={"/system/NhasxManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("NhasxManage")}
                        className="active"
                      >
                        Quản lý nhà sản xuất
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/NhasxManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("NhasxManage")}>
                        Quản lý nhà sản xuất
                      </div>
                    </Link>
                  )} */}

                  {link === "TdhvManage" ? (
                    <Link
                      to={"/system/TdhvManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("TdhvManage")}
                        className="active"
                      >
                        Quản lý trình độ học vấn
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/TdhvManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("TdhvManage")}>
                        Quản lý trình độ học vấn
                      </div>
                    </Link>
                  )}

                  {link === "XaphuongManage" ? (
                    <Link
                      to={"/system/XaphuongManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("XaphuongManage")}
                        className="active"
                      >
                        Quản lý phường(xã)
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/XaphuongManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("XaphuongManage")}>
                        Quản lý phường(xã)
                      </div>
                    </Link>
                  )}

                  {link === "HuyenquanManage" ? (
                    <Link
                      to={"/system/HuyenquanManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("HuyenquanManage")}
                        className="active"
                      >
                        Quản lý huyện(quận)
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/HuyenquanManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("HuyenquanManage")}>
                        Quản lý huyện(quận)
                      </div>
                    </Link>
                  )}

                  {link === "TinhthanhManage" ? (
                    <Link
                      to={"/system/TinhthanhManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        onClick={() => this.handleLink("TinhthanhManage")}
                        className="active"
                      >
                        Quản lý tỉnh
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={"/system/TinhthanhManage"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div onClick={() => this.handleLink("TinhthanhManage")}>
                        Quản lý tỉnh
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
              {/* <div>
                <i className="far fa-bell">
                  <div className="thongbao">
                    <span>2</span>
                  </div>
                </i>
              </div> */}

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
