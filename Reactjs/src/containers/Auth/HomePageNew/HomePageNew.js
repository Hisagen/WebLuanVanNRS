import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePageNew.scss";

import logo2 from "../../../assets/logo2.png";
import background1 from "../../../assets/background.jpg";
import background2 from "../../../assets/background3.jpg";
import background3 from "../../../assets/background2.jpg";
import background_dv from "../../../assets/background_dv.jpg";
import Select from "react-select";
import HomeFooterNew from "./HomeFooterNew";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import SearchBar from "./SearchBar";
import data from "./Data.json";
// ảnh chỗ giới thiệu
import img1 from "../../../assets/homenew/gioithieu1.jpg";
import img2 from "../../../assets/homenew/gioithieu2.jpg";
import img3 from "../../../assets/homenew/gioithieu3.jpg";
import img4 from "../../../assets/homenew/gioithieu4.jpg";
import img5 from "../../../assets/homenew/gioithieu5.jpg";
import img6 from "../../../assets/homenew/gioithieu6.jpg";

// ảnh chỗ chiến lượt
import chienluot1 from "../../../assets/homenew/img_luachon/luachon1.jpg";
import chienluot2 from "../../../assets/homenew/img_luachon/luachon2.jpg";
import chienluot3 from "../../../assets/homenew/img_luachon/luachon3.jpg";
import chienluot4 from "../../../assets/homenew/img_luachon/luachon4.jpg";
import chienluot5 from "../../../assets/homenew/img_luachon/luachon5.jpg";
import chienluot6 from "../../../assets/homenew/img_luachon/luachon6.jpg";

//// icon dịch  vụ

import icon1 from "../../../assets/icon/icon-s1.png";
import icon2 from "../../../assets/icon/icon-s2.png";
import icon3 from "../../../assets/icon/icon-s3.png";
import icon4 from "../../../assets/icon/icon-s4.png";
import icon5 from "../../../assets/icon/icon-s5.png";
import icon6 from "../../../assets/icon/icon-s6.png";
//
import OurStadingDoctor from "../../HomePage/Section/OurStadingDoctor";
import Specialty from "../../HomePage/Section/Specialty";
import Feedback from "../../Feedback/Feedback";
import ModalLogin from "../../Patient/Doctor/Modal/modalLogin";
import {
  getBenhNhanChidinhIdService,
  getBenhNhanChidinhIdService1,
  getBenhNhanPhieukhamIdService,
  getBenhNhanPhieukhamIdService1,
} from "../../../services/chidinhService";

import { searchAll } from "../../../services/searchService";
// aos
import AOS from "aos";
import "aos/dist/aos.css";
import ModalDangKy from "../../Patient/Doctor/Modal/modalDangKy";
import ModalDoiMatKhau from "../../../containers/User/modalDoiMatKhau";
AOS.init({
  duration: 2000,
});

class HomeHeaderNew extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.gioithieu = React.createRef();
    this.chienluot = React.createRef();
    this.chuyenkhoa = React.createRef();
    this.dsBS = React.createRef();
    this.feedback = React.createRef();
    this.dichvu = React.createRef();
    this.state = {
      change: false,
      nn: false,
      selectedOption: null,
      optionArray: [],
      data: [],
      openLogin: false,
      openDangKy: false,
      openSetting: false,
      isOpenDoiMatKhau: false,
    };
  }

  async componentDidMount() {
    let data = await searchAll();
    if (data) {
      this.setState({
        data: data.data,
      });
    }
    if (this.props.isLoggedInBN === true) {
      let { benhnhan } = this.props.benhnhanInfo;

      this.getDataPatient(benhnhan);
    }

    this.timerID = setInterval(
      () =>
        this.setState({
          time: this.state.time + 1,
        }),
      1000
    );

    if (this.props.temp !== "") {
      this.scrollDownGopY(this.props.temp);
      this.props.getTempRedux("");
    }
  }

  async componentDidUpdate(prevProps, presState, snapshot) {}

  getDataPatient = async (benhnhan) => {
    let res = await getBenhNhanPhieukhamIdService({
      id_benhnhan: benhnhan.id,
      // ngay: formatedDate
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  handleScroll = (event) => {
    if (this.myRef.current.scrollTop > 80) {
      this.setState({
        change: true,
      });
    } else {
      this.setState({
        change: false,
      });
    }
  };
  handleNN = () => {
    this.setState({
      nn: !this.state.nn,
    });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  scrollDown = (ref) => {
    this.myRef.current.scrollTo({
      top: ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };
  scrollDownGopY = (data) => {
    this.myRef.current.scrollTo({
      top: data - 100,
      behavior: "smooth",
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
    this.setState({
      openLogin: !this.state.openLogin,
    });
  };
  toggleDangKy = () => {
    this.setState({
      openDangKy: !this.state.openDangKy,
    });
  };
  handleLogOut = () => {
    this.props.processBNLogout();
    if (this.props.pageInformation === true) {
      window.location.href("/homenew");
    }
  };
  handleShow = () => {
    this.setState({
      openSetting: !this.state.openSetting,
    });
  };
  openDoiMatKhau = () => {
    this.setState({
      isOpenDoiMatKhau: true,
    });
  };
  toggleDMK = () => {
    this.setState({
      isOpenDoiMatKhau: !this.state.isOpenDoiMatKhau,
    });
  };
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 1000,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
    };

    let settingDoctors = {
      dots: false,
      infinite: false,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
    };

    let settingBanner = {
      infinite: true,
      fade: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 7000,
    };
    const { selectedOption } = this.state;
    const { processBNLogout, benhnhanInfo, isLoggedInBN } = this.props;
    return (
      <div
        className="container-homeheader"
        onScroll={(event) => {
          this.handleScroll(event);
        }}
        ref={this.myRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
        }}
      >
        <ModalDoiMatKhau
          isOpen={this.state.isOpenDoiMatKhau}
          toggleFromParent={this.toggleDMK}
        />
        <div className="background-1">
          <div className="slider">
            <Slider {...settingBanner}>
              <div className="img">
                <img src={background2}></img>
              </div>
              <div className="img">
                <img src={background1}></img>
              </div>
              <div className="img">
                <img src={background3}></img>
              </div>
            </Slider>
          </div>
          {this.state.change === false ? (
            <div className="khung1 fixed-top">
              <div className="table-1">
                <Link to={"/homenew"} style={{ background: "none" }}>
                  <img src={logo2}></img>
                </Link>
              </div>

              <div className="table-2">
                <div
                  onClick={() => {
                    this.scrollDown(this.gioithieu);
                  }}
                >
                  <span
                    data-aos="fade-down"
                    data-aos-delay="5000"
                    data-aos-duration="1000"
                  >
                    Về chúng tôi
                  </span>
                </div>
                <div>
                  <Link
                    to={"/quy-trinh"}
                    style={{ background: "none", color: "white" }}
                  >
                    <span
                      data-aos="fade-down"
                      data-aos-delay="5000"
                      data-aos-duration="1000"
                    >
                      Quy trình
                    </span>
                  </Link>
                </div>
                <div
                  onClick={() => {
                    this.scrollDown(this.chuyenkhoa);
                  }}
                >
                  Chuyên khoa
                </div>
                <div
                  onClick={() => {
                    this.scrollDown(this.dsBS);
                  }}
                >
                  Đội ngũ bác sĩ
                </div>

                <div
                  onClick={() => {
                    this.scrollDown(this.feedback);
                  }}
                >
                  Liên hệ
                </div>
                <div>
                  <Link
                    to={"/dichvu"}
                    style={{
                      color: "inherit",
                      background: "#3d6889",
                    }}
                  >
                    Dịch vụ
                  </Link>
                </div>
              </div>
              <div className="table-3">
                {isLoggedInBN ? (
                  <span className="menu-1">
                    <i
                      className="fas fa-user"
                      style={{ fontSize: "20px" }}
                      onClick={() => this.handleShow()}
                    >
                      &nbsp;&nbsp;
                      {isLoggedInBN ? benhnhanInfo.benhnhan?.hoten : ""}
                    </i>{" "}
                    {this.state.openSetting === true ? (
                      <div className="setting">
                        <Link to={"/information"} style={{ color: "black" }}>
                          <div style={{ marginTop: "15px" }}>
                            <i class="far fa-user"></i> Thông tin cá nhân
                          </div>
                        </Link>
                        <Link to={"/lich-su-kham"}>
                          <div style={{ marginTop: "15px" }}>
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
                          onClick={() => this.handleLogOut()}
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
                  </span>
                ) : (
                  <div className="menu-1">
                    <span onClick={() => this.handleDangNhap()}>Đăng nhập</span>
                    <span>/</span>
                    <span onClick={() => this.handleDangKy()}>Đăng ký</span>
                  </div>
                )}
                {isLoggedInBN ? (
                  <div
                    className="btn btn-logout"
                    onClick={processBNLogout}
                    title="Log out"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <div className="khung2 fixed-top">
              <div className="table-1">
                <Link to={"/homenew"} style={{ background: "none" }}>
                  <img src={logo2}></img>
                </Link>
              </div>

              <div className="table-2">
                <div
                  onClick={() => {
                    this.scrollDown(this.gioithieu);
                  }}
                >
                  Về chúng tôi
                </div>
                <div>
                  <Link
                    to={"/quy-trinh"}
                    style={{ background: "none", color: "black" }}
                  >
                    <span
                      data-aos="fade-down"
                      data-aos-delay="5000"
                      data-aos-duration="1000"
                    >
                      Quy trình
                    </span>
                  </Link>
                </div>
                <div
                  onClick={() => {
                    this.scrollDown(this.chuyenkhoa);
                  }}
                >
                  Chuyên khoa
                </div>
                <div
                  onClick={() => {
                    this.scrollDown(this.dsBS);
                  }}
                >
                  Đội ngũ bác sĩ
                </div>

                <div
                  onClick={() => {
                    this.scrollDown(this.feedback);
                  }}
                >
                  Liên hệ
                </div>
                <Link
                  className="dichvu-link"
                  to={"/dichvu"}
                  style={{
                    color: "black",
                    background: "none",
                  }}
                >
                  <div>Dịch vụ</div>
                </Link>
              </div>
              <div className="table-3">
                {isLoggedInBN ? (
                  <span className="menu-1">
                    <i
                      className="fas fa-user"
                      onClick={() => this.handleShow()}
                      style={{ fontSize: "20px" }}
                    >
                      &nbsp;&nbsp;
                      {isLoggedInBN ? benhnhanInfo.benhnhan.hoten : ""}
                    </i>

                    {this.state.openSetting === true ? (
                      <div className="setting">
                        <Link to={"/information"} style={{ color: "black" }}>
                          <div
                            style={{ marginTop: "15px" }}
                            // onClick={this.handleChuyenTrang("infomation")}
                          >
                            <i class="far fa-user"></i> Thông tin cá nhân
                          </div>
                        </Link>
                        <Link to={"/lich-su-kham"}>
                          <div style={{ marginTop: "15px" }}>
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
                          onClick={() => this.handleLogOut()}
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
                  </span>
                ) : (
                  <div className="menu-1">
                    <span onClick={() => this.handleDangNhap()}>Đăng nhập</span>
                    <span>/</span>
                    <span onClick={() => this.handleDangKy()}>Đăng ký</span>
                  </div>
                )}

                {isLoggedInBN ? (
                  <div
                    className="btn btn-logout"
                    onClick={() => this.handleLogOut()}
                    title="Log out"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
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
          <div className="in-background">
            {/* animate__animated animate__backInDown */}
            <div className="text animate__animated animate__backInDown">
              Nền tảng y tế Chăm sóc sức khỏe toàn diện
            </div>
            <div className="search">
              <SearchBar
                placeholder={"Nhập thông tin để tìm kiếm..."}
                data={this.state.data}
              />
            </div>

            <div className="menu-ngang">
              <div className="table-1 ">
                <span>Giờ Làm Việc</span>
                <div className="khung-content animate__animated animate__fadeInDown">
                  <div className="content-table-1 ">
                    <i className="far fa-clock"></i>
                    <div className="content-1">
                      <div className="start">Thứ 2 – thứ 6</div>
                      <div className="end">07:00-18:00</div>
                    </div>
                  </div>
                  <hr />
                  <div className="content-table-1">
                    <i className="far fa-clock"></i>{" "}
                    <div className="content-1">
                      <div className="start">Thứ 7</div>
                      <div className="end">07:00-15:00</div>
                    </div>
                  </div>
                  <hr />
                  <div className="content-table-1">
                    <i className="far fa-clock"></i>{" "}
                    <div className="content-1">
                      <div className="start">Chủ Nhật</div>
                      <div className="end">Nghỉ</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-2">
                <span>Đặt Lịch Khám Bệnh</span>
                <div className="khung-content animate__animated animate__fadeInDown">
                  <div className="content-table-1 ">
                    <i className="far fa-calendar-alt"></i>
                    <div className="content-1">
                      Chọn khoảng thời gian phù hợp với bạn rồi liên hệ với
                      chúng tôi
                    </div>
                  </div>
                  <hr />
                  <Link to={"/page-all-doctor"} style={{ background: "none" }}>
                    <div className="btn">
                      <button>Đặt lịch ngay</button>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="table-3">
                <span>Chi Tiết Liên Hệ</span>
                <div className="khung-content animate__animated animate__fadeInDown">
                  <div className="content-table-1 ">
                    <i className="fas fa-map-marker-alt"></i>
                    <div className="content-1">
                      Đường 3/2, Trường Đại học Cần Thơ, Ninh Kiều, Cần Thơ
                    </div>
                  </div>
                  <hr />
                  <div className="btn">
                    <Link to={"/map"}>
                      <button>Xem bản đồ</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="GioiThieu" ref={this.gioithieu} id="gt">
          <div className="title-gioithieu">GIỚI THIỆU VỀ LONG SIN HOSPITAL</div>
          <div className="mota">
            <p>
              Ở Việt Nam hiện nay, các nhà quản lý của các phòng khám, bệnh viện
              vừa và nhỏ đang đứng trước một bài toán khó trong việc nâng cao
              chất lượng dịch vụ song song với việc tiết kiệm thời gian và giảm
              chi phí vận hành
            </p>
          </div>
          <div className="chung">
            <div className="col1">
              <div className="table1">
                <div className="name">Tại sao nên chọn chúng tôi:</div>
                <div className="direction">
                  việc triển khai đăng ký khám bệnh online nhằm giải quyết tình
                  trạng người bệnh phải xếp hàng chờ đợi lấy số khám. Nếu bệnh
                  nhân đăng ký trước, phòng khám, bệnh viện sẽ chủ động sắp xếp
                  lịch sao cho phù hợp với cả hai bên, tránh tình trạng quá đông
                  hay quá vắng.
                </div>
              </div>
              <div className="table2">
                <img src={img1}></img>
              </div>
            </div>
            <div className="col2">
              <img src={img2}></img>
            </div>
            <div className="col3">
              <img src={img3}></img>
            </div>
          </div>
          <div className="chung">
            <div className="col2">
              <img src={img4}></img>
            </div>
            <div className="col1">
              <div className="table1">
                <div className="name">
                  Bảo mật thông tin Khách Hàng ưu tiên hàng đầu
                </div>
                <div className="direction">
                  Các thông tin sức khỏe cá nhân được lưu trữ ở hồ sơ bệnh án.
                  Thông tin trên hồ sơ bệnh án cần được bảo mật và cập nhật liên
                  tục. Không những thế, vì được lưu trữ trên hệ thống, nên chỉ
                  có thể đăng nhập bằng password để xem được thông tin sức khỏe,
                  rất bảo mật và an toàn.
                </div>
              </div>
              <div className="table2">
                <img src={img6}></img>
              </div>
            </div>
            <div className="col3">
              <img src={img5}></img>
            </div>
          </div>
        </div>

        <div className="dichvu" ref={this.dichvu}>
          <img src={background_dv}></img>
          <div className="container-dichvu">
            <div>
              <h2
                style={{
                  textAlign: "center",
                  color: "#73d0f4",
                  fontSize: "30px",
                  fontWeight: "600",
                }}
              >
                Dịch vụ y tế của chúng tôi
              </h2>

              <div
                className="direction-dv"
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: "16px",
                  width: "80%",
                  textAlign: "center",
                  paddingLeft: "300px",
                  marginTop: "20px",
                }}
              >
                Tìm hiểu thêm về các dịch vụ chăm sóc sức khỏe của chúng tôi, từ
                cảm mạo thông thường đến các bệnh mạn tính - các bác sĩ thân
                thiện sẽ tận tình chăm sóc bạn và gia đình.
              </div>
            </div>
            <div className="container-dichvu2">
              <div className="khung" style={{ display: "flex", height: "50%" }}>
                <div className="col1">
                  <div>
                    <img src={icon4}></img>
                  </div>
                  <div className="title-dv">Khám tổng quát</div>
                  <div className="direction-dv">
                    Các hạng mục khám lâm sàng, kiểm tra thể lực bao gồm: đo
                    chiều cao, cân nặng, tính chỉ số BMI, kiểm tra mạch,...
                  </div>
                </div>
                <div className="col1">
                  <div>
                    <img src={icon2}></img>
                  </div>
                  <div className="title-dv">Truyền dịch y tế</div>
                  <div className="direction-dv">
                    Truyền dịch tĩnh mạch là qui trình kỹ thuật điều dưỡng
                    thường được thực hành trong điều trị, chăm sóc bệnh nhân.
                  </div>
                </div>
                <div className="col1">
                  <div>
                    <img src={icon3}></img>
                  </div>
                  <div className="title-dv">Cấp cứu hồi sức</div>
                  <div className="direction-dv">
                    Với trang thiết bị hiện đại, đội ngũ nhân viên có trình độ
                    chuyên môn cao, tận tâm với công việc, năng nổ nhiệt tình.
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", height: "50%" }}>
                <div className="col1">
                  <div>
                    <img src={icon1}></img>
                  </div>
                  <div className="title-dv">Đo điện tim</div>
                  <div className="direction-dv">
                    Điện tim, đây là một cận lâm sàng không xâm lấn, không gây
                    đau đớn, là một trong những cơ sở giúp các bác sĩ chẩn đoán
                    những vấn đề bất thường của tim.
                  </div>
                </div>
                <div className="col1">
                  <div>
                    <img src={icon5}></img>
                  </div>
                  <div className="title-dv">Chụp X-quang</div>
                  <div className="direction-dv">
                    chụp X-quang đóng vai trò rất quan trọng trong việc chẩn
                    đoán và điều trị bệnh. Phương pháp này hỗ trợ bác sĩ quan
                    sát bên trong cơ thể người bệnh mà không cần phải mổ.
                  </div>
                </div>
                <div className="col1">
                  <div>
                    <img src={icon6}></img>
                  </div>
                  <div className="title-dv">Xét nghiệm máu</div>
                  <div className="direction-dv">
                    là các loại xét nghiệm được thực hiện trên các mẫu máu được
                    lấy vào các ống chống đông khác nhau tùy mục đích xét nghiệm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chuyenkhoa" ref={this.chuyenkhoa}>
          <Specialty settings={settingDoctors} />
        </div>
        <div className="danhsach-bacsi " ref={this.dsBS}>
          <OurStadingDoctor settings={settingDoctors} />
        </div>

        <div
          className="feedback"
          style={{
            backgroundColor: "#f1f5f8",
            paddingTop: "40px",
          }}
          ref={this.feedback}
        >
          <Feedback />
        </div>
        <div className="footer">
          <HomeFooterNew />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    benhnhanInfo: state.benhnhan.benhnhanInfo,
    temp: state.benhnhan.temp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processBNLogout: () => dispatch(actions.processBNLogout()),
    getTempRedux: (data) => dispatch(actions.getTemp(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeaderNew);
