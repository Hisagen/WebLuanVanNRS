import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeHeaderNew.scss";
import { withRouter } from "react-router";

import logo2 from "../../../assets/logo2.png";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions";
import ModalDoiMatKhau from "../../User/modalDoiMatKhau";
import ManagePatient1 from "../../HomePage/ManagePatient1";
import SearchBar from "../../Auth/HomePageNew/SearchBar";
import { searchAll } from "../../../services/searchService";
import ModalLogin from "../../Patient/Doctor/Modal/modalLogin";
import ModalDangKy from "../../Patient/Doctor/Modal/modalDangKy";
import Infomation from "../../User/Infomation";
class HomeHeaderNew extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.gioithieu = React.createRef();
    this.chienluot = React.createRef();
    this.chuyenkhoa = React.createRef();
    this.dsBS = React.createRef();
    this.feedback = React.createRef();
    this.state = {
      openLogin: false,
      openDangKy: false,
      change: false,
      nn: false,
      selectedOption: null,
      dataPatient: {},
      isOpenChiDinh1: false,
      isOpenDoiMatKhau: false,
      benhnhan: {},
      chidinh: {},
      chidinh1: {},
      data: [],
      openSetting: false,
      isOpenDoiMatKhau: false,
      ChuyenKhoaST: "",
    };
  }

  async componentDidMount() {
    let data = await searchAll();
    if (data) {
      this.setState({
        data: data.data,
      });
    }
    await this.props.fetchChuyenkhoaRedux();
    if (this.props.listChuyenkhoas && this.props.listChuyenkhoas.length) {
      this.setState({
        ChuyenKhoaST: this.props?.listChuyenkhoas[0].id,
      });
    }
  }

  handleScroll = (event) => {
    if (this.props.myRef.current.scrollTop > 80) {
      // this.setState({
      //   change: true,
      // });
    } else {
      // this.setState({
      //   change: false,
      // });
    }
  };
  handleNN = () => {
    this.setState({
      nn: !this.state.nn,
    });
  };
  scrollDown = (ref) => {
    this.myRef.current.scrollTo({
      top: ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };
  // handleDangNhap = async () => {
  //   let isLoggedInBN = this.props.isLoggedInBN;
  //   if (isLoggedInBN !== true) {
  //   }
  // };
  handleShow = () => {
    this.setState({
      openSetting: !this.state.openSetting,
    });
  };
  handleDangNhap = async () => {
    this.setState({
      openLogin: true,
    });
  };
  handleDangKy = () => {
    this.setState({
      openDangKy: true,
    });
  };
  toggleLogin = () => {
    this.setState(
      {
        openLogin: !this.state.openLogin,
      },
      () => {
        if (this.props.dangnhap) {
          this.props.dangnhap(true);
        }
      }
    );
  };
  toggleDangKy = () => {
    this.setState({
      openDangKy: !this.state.openDangKy,
    });
  };
  handleOut = () => {
    this.setState(
      {
        openSetting: false,
      },
      () => {
        this.props.processBNLogout();

        if (this.props.pageInformation === true) {
          window.location.assign("/homenew");
        }
        if (this.props.pageLichSuKham === true) {
          window.location.assign("/homenew");
        }
        if (this.props.dangxuat) {
          this.props.dangxuat(true);
        }
      }
    );
  };
  // handleChuyenTrang = (name) => {
  //   window.location.href = `/${name}`;
  // };
  toggleDMK = () => {
    this.setState({
      isOpenDoiMatKhau: !this.state.isOpenDoiMatKhau,
    });
  };
  openDoiMatKhau = () => {
    this.setState({
      isOpenDoiMatKhau: true,
    });
  };
  handlePageLienHe = async () => {
    // console.log("history", this.props.history);

    this.props.history.push("/homenew");
    await this.props.getTempRedux(4230);
  };
  render() {
    const { processBNLogout, benhnhanInfo, isLoggedInBN } = this.props;
    let currentChidinh = this.state.chidinh;
    let currentChidinh1 = this.state.chidinh1;
    let { data } = this.state;

    return (
      <div>
        <ManagePatient1
          isOpen={this.state.isOpenChiDinh1}
          toggleFromParent={this.toggleChiDinhModal1}
          currentChidinh={currentChidinh}
          currentChidinh1={currentChidinh1}
        />
        <ModalDoiMatKhau
          isOpen={this.state.isOpenDoiMatKhau}
          toggleFromParent={this.toggleDMK}
        />
        <div
          onScroll={(event) => {
            this.handleScroll(event);
          }}
          ref={this.props.myRef}
          style={{
            width: "100%",
            height: "100%",
            overflow: "scroll",
            // overflow: "hidden",
          }}
        >
          <div className="homeHeader fixed-top">
            <div className="table-1">
              <Link
                to={"/homenew"}
                style={{
                  textDecoration: "none",
                  background: "none",
                }}
              >
                <img src={logo2}></img>
              </Link>
            </div>

            <div className="table-2">
              <div>
                <Link
                  to={"/homenew"}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div>Trang chủ</div>
                </Link>
              </div>
              <div>
                <Link
                  to={`/quy-trinh`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div>Quy trình</div>
                </Link>
              </div>
              <div>
                <Link
                  to={`/api/get-id-chuyenkhoa/${this.state.ChuyenKhoaST}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div>Chuyên khoa</div>
                </Link>
              </div>
              <div>
                <Link
                  to={"/page-all-doctor"}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div>Đội ngũ bác sĩ</div>
                </Link>
              </div>
              <div onClick={() => this.handlePageLienHe()}>Liên hệ</div>
              <div>
                <Link
                  to={"/dichvu"}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div>Dịch vụ</div>
                </Link>
              </div>
            </div>
            <div className="table-3">
              {/* <div id="google_translate_element" className="translate"></div> */}
              {isLoggedInBN ? (
                <span className="menu-1">
                  <i
                    className="fas fa-user"
                    style={{ fontSize: "20px" }}
                    onClick={() => this.handleShow()}
                  >
                    &nbsp;&nbsp;
                    <span>
                      {isLoggedInBN ? benhnhanInfo?.benhnhan?.hoten : ""}{" "}
                    </span>
                  </i>{" "}
                  {this.state.openSetting === true ? (
                    <div className="setting animate__animated animate__zoomIn">
                      <Link to={"/information"} style={{ color: "black" }}>
                        <div
                          style={{ marginTop: "15px" }}
                          // onClick={this.handleChuyenTrang("infomation")}
                        >
                          <i class="far fa-user"></i> Thông tin cá nhân
                        </div>
                      </Link>
                      <Link to={"/lich-su-kham"}>
                        <div style={{ marginTop: "15px", color: "black" }}>
                          <i class="fas fa-calendar-alt"></i>{" "}
                          <span style={{ fontSize: "15px" }}>
                            Lịch Sử Đặt Khám
                          </span>
                        </div>
                      </Link>

                      <div
                        style={{ marginTop: "15px" }}
                        onClick={() => this.openDoiMatKhau()}
                      >
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAxNiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC4zIiBkPSJNMTUuNTU1NSA3Ljk3MDhIMTQuMjIyMlY2LjE5OTVDMTQuMjIyMiAyLjc4MTA2IDExLjQzMSAwIDggMEM0LjU2OSAwIDEuNzc3NzkgMi43ODEwNiAxLjc3Nzc5IDYuMTk5NVY3Ljk3MDhIMC40NDQ0NThDMC4xOTg3OTIgNy45NzA4IDAgOC4xNjg4NyAwIDguNDEzNjRWMTkuNDg0MkMwIDIwLjQ2MTEgMC43OTcyOTIgMjEuMjU1NSAxLjc3Nzc5IDIxLjI1NTVIMTQuMjIyM0MxNS4yMDI3IDIxLjI1NTUgMTYgMjAuNDYxMSAxNiAxOS40ODQyVjguNDEzNjRDMTYgOC4xNjg4NyAxNS44MDEyIDcuOTcwOCAxNS41NTU1IDcuOTcwOFpNOS4zMzA3NSAxNy4yMjEyQzkuMzQ0NjIgMTcuMzQ2MiA5LjMwNDI5IDE3LjQ3MTYgOS4yMjAwOCAxNy41NjU1QzkuMTM1ODggMTcuNjU5MyA5LjAxNTIxIDE3LjcxMjkgOC44ODg5MiAxNy43MTI5SDcuMTExMTNDNi45ODQ4MyAxNy43MTI5IDYuODY0MTcgMTcuNjU5MyA2Ljc3OTk2IDE3LjU2NTVDNi42OTU3NSAxNy40NzE2IDYuNjU1MzggMTcuMzQ2MiA2LjY2OTI5IDE3LjIyMTJMNi45NDk2NyAxNC43MDkyQzYuNDk0MzggMTQuMzc5MiA2LjIyMjI1IDEzLjg1NzIgNi4yMjIyNSAxMy4yODQ3QzYuMjIyMjUgMTIuMzA3OCA3LjAxOTU0IDExLjUxMzQgOC4wMDAwNCAxMS41MTM0QzguOTgwNTQgMTEuNTEzNCA5Ljc3NzgzIDEyLjMwNzggOS43Nzc4MyAxMy4yODQ3QzkuNzc3ODMgMTMuODU3MiA5LjUwNTcxIDE0LjM3OTIgOS4wNTA0MiAxNC43MDkyTDkuMzMwNzUgMTcuMjIxMlpNMTEuNTU1NSA3Ljk3MDhINC40NDQ0NlY2LjE5OTVDNC40NDQ0NiA0LjI0NjE2IDYuMDM5NSAyLjY1NjkzIDggMi42NTY5M0M5Ljk2MDUgMi42NTY5MyAxMS41NTU1IDQuMjQ2MTYgMTEuNTU1NSA2LjE5OTVWNy45NzA4WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg=="></img>
                        &nbsp; Đổi mật khẩu
                      </div>
                      <div
                        style={{ marginTop: "15px", marginBottom: "15px" }}
                        onClick={() => this.handleOut()}
                      >
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC4zIj4KPHBhdGggZD0iTTEyLjUgMTAuODMzM0MxMi4wMzkyIDEwLjgzMzMgMTEuNjY2NyAxMS4yMDY3IDExLjY2NjcgMTEuNjY2NlYxNUMxMS42NjY3IDE1LjQ1OTEgMTEuMjkzMyAxNS44MzMzIDEwLjgzMzMgMTUuODMzM0g4LjMzMzI4VjMuMzMzMjhDOC4zMzMyOCAyLjYyMTYxIDcuODc5OTQgMS45ODU3OCA3LjE5ODMzIDEuNzQ5MTFMNi45NTE2IDEuNjY2NTZIMTAuODMzM0MxMS4yOTMzIDEuNjY2NTYgMTEuNjY2NyAyLjA0MDcxIDExLjY2NjcgMi41VjVDMTEuNjY2NyA1LjQ1OTkgMTIuMDM5MiA1LjgzMzI4IDEyLjUgNS44MzMyOEMxMi45NjA4IDUuODMzMjggMTMuMzMzMyA1LjQ1OTkgMTMuMzMzMyA1VjIuNUMxMy4zMzMzIDEuMTIxNjcgMTIuMjExNiAwIDEwLjgzMzMgMEgxLjg3NUMxLjg0MzI2IDAgMS44MTY3MSAwLjAxNDE5MDcgMS43ODU4OSAwLjAxODMxMDVDMS43NDU3NiAwLjAxNDk1MzYgMS43MDc0NiAwIDEuNjY2NzIgMEMwLjc0NzUyOCAwIDAgMC43NDczNzUgMCAxLjY2NjU2VjE2LjY2NjZDMCAxNy4zNzgyIDAuNDUzMzM5IDE4LjAxNDEgMS4xMzQ5NSAxOC4yNTA3TDYuMTUwMDUgMTkuOTIyNUM2LjMyMDA0IDE5Ljk3NSA2LjQ4OTEgMjAgNi42NjY3MiAyMEM3LjU4NTkxIDIwIDguMzMzMjggMTkuMjUyNSA4LjMzMzI4IDE4LjMzMzNWMTcuNUgxMC44MzMzQzEyLjIxMTYgMTcuNSAxMy4zMzMzIDE2LjM3ODMgMTMuMzMzMyAxNVYxMS42NjY2QzEzLjMzMzMgMTEuMjA2NyAxMi45NjA4IDEwLjgzMzMgMTIuNSAxMC44MzMzWiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTE5Ljc1NTcgNy43NDQxOEwxNi40MjIzIDQuNDEwOUMxNi4xODQxIDQuMTcyNTUgMTUuODI1NyA0LjEwMDg0IDE1LjUxNDEgNC4yMjk5M0MxNS4yMDMyIDQuMzU5MTcgMTQuOTk5OCA0LjY2MzI4IDE0Ljk5OTggNS4wMDAwNFY3LjUwMDA0SDExLjY2NjZDMTEuMjA2NSA3LjUwMDA0IDEwLjgzMzEgNy44NzMyNyAxMC44MzMxIDguMzMzMzJDMTAuODMzMSA4Ljc5MzM3IDExLjIwNjUgOS4xNjY2IDExLjY2NjYgOS4xNjY2SDE0Ljk5OThWMTEuNjY2NkMxNC45OTk4IDEyLjAwMzQgMTUuMjAzMiAxMi4zMDc1IDE1LjUxNDEgMTIuNDM2N0MxNS44MjU3IDEyLjU2NTggMTYuMTg0MSAxMi40OTQxIDE2LjQyMjMgMTIuMjU1OUwxOS43NTU3IDguOTIyNDZDMjAuMDgxNSA4LjU5NjY5IDIwLjA4MTUgOC4wNjk5NSAxOS43NTU3IDcuNzQ0MThaIiBmaWxsPSJibGFjayIvPgo8L2c+Cjwvc3ZnPgo="></img>
                        &nbsp; Đăng Xuất
                      </div>
                      <div
                        style={{ textAlign: "center" }}
                        onClick={() => this.handleShow()}
                      >
                        Thoát
                      </div>
                      <div></div>
                    </div>
                  ) : null}
                  {/* <div className="thongtin-BN">
                      <div className="tt">
                        <div className="tt-1">
                          <Link
                            to={"/information"}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <i className="fas fa-info"></i> &nbsp; Infomation
                          </Link>
                        </div>
                        <div
                          className="tt-2"
                          onClick={() => {
                            this.handleOpenDMK();
                          }}
                        >
                          <i className="fas fa-cog"></i> &nbsp; Reset password
                        </div>
                      </div>
                    </div> */}
                </span>
              ) : (
                <div className="menu-1">
                  <span
                    onClick={() => this.handleDangNhap()}
                    style={{ fontSize: "16px", color: "#4cc48b" }}
                  >
                    {/* <Link to={"/login1"} style={{ color: "black" }}> */}
                    Đăng nhập / {/* </Link> */}
                  </span>

                  <span
                    onClick={() => this.handleDangKy()}
                    style={{ fontSize: "16px", color: "#4cc48b" }}
                  >
                    &nbsp; Đăng ký
                  </span>
                </div>
              )}
              {isLoggedInBN ? (
                <div
                  className="btn btn-logout"
                  onClick={() => this.handleOut()}
                  title="Log out"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        {this.state.openLogin === true ? (
          <ModalLogin
            openLogin={this.state.openLogin}
            toggleFromParent={this.toggleLogin}
            toggleOpenDangKy={this.toggleDangKy}
          />
        ) : (
          <div></div>
        )}
        {this.state.openDangKy === true ? (
          <ModalDangKy
            openDangKy={this.state.openDangKy}
            toggleFromParent={this.toggleDangKy}
            toggleOpenDangNhap={this.toggleLogin}
          />
        ) : (
          <div></div>
        )}
        {this.props.isShow === true ? (
          <div
            className="head"
            style={
              {
                // paddingLeft: "200px" //CSSLong
              }
            }
          >
            <span
              style={{
                color: "#00ba99",
                fontWeight: "600",
                fontSize: "25px",
                paddingTop: "50px",
                position: "absolute",
                marginLeft: "500px",
              }}
            >
              Đặt khám trước với Long Sin Hospital
            </span>
            <span
              style={{
                // color: "#00ba99",
                fontWeight: "600",
                fontSize: "14px",
                paddingTop: "90px",
                position: "absolute",
                marginLeft: "475px",
              }}
            >
              Để được tiếp đón ưu tiên viện hoặc được tư vấn với bác sĩ giỏi
              ngay tại nhà
            </span>
            <div className="thanh-search">
              <SearchBar
                placeholder={"Nhập thông tin để tìm kiếm..."}
                data={this.state.data}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    benhnhanInfo: state.benhnhan.benhnhanInfo,
    listChuyenkhoas: state.admin.chuyenkhoas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processBNLogout: () => dispatch(actions.processBNLogout()),
    fetchChuyenkhoaRedux: () => dispatch(actions.fetchAllChuyenkhoaStart()),
    getTempRedux: (data) => dispatch(actions.getTemp(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeaderNew)
);
