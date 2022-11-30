import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/logo.png";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";
import ManagePatient1 from "./ManagePatient1";
import Select from "react-select";
import { Link } from "react-router-dom";
import MenuDoc from "./Section/MenuDoc";
import {
  getBacsibenhnhanIdService,
  getBacsiOnebenhnhanIdService,
  getVienchucbenhnhanIdService,
} from "../../services/benhnhanService";
import { createPhieukhamService } from "../../services/phieukhamService";
import {
  getBenhNhanChidinhIdService,
  getBenhNhanChidinhIdService1,
  getBenhNhanPhieukhamIdService,
  getBenhNhanPhieukhamIdService1,
} from "../../services/chidinhService";
import { after } from "lodash";
import ModalDoiMatKhau from "../User/modalDoiMatKhau";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: {},
      isOpenChiDinh1: false,
      isOpenDoiMatKhau: false,
      benhnhan: {},
      chidinh: {},
      chidinh1: {},
      time: 1,
      // action: false,
      selectedOption: null,
      action: false,
    };
  }

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
  async componentDidMount() {
    if (this.props.isLoggedInBN === true) {
      let { benhnhan } = this.props.benhnhanInfo;

      // let { currentDate } = this.state
      // let formatedDate = new Date(currentDate).getTime();
      this.getDataPatient(benhnhan);
    }

    //////
    this.timerID = setInterval(
      () =>
        this.setState({
          time: this.state.time + 1,
        }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  handleChiDinh1 = async () => {
    let respone = await getBenhNhanPhieukhamIdService(
      this.props.benhnhanInfo.benhnhan.id
    );
    let respone1 = await getBenhNhanPhieukhamIdService1(
      this.props.benhnhanInfo.benhnhan.id
    );
    this.setState({
      isOpenChiDinh1: true,
      chidinh: respone.data,
      chidinh1: respone1.data,
    });
  };

  toggleChiDinhModal1 = () => {
    this.setState({
      isOpenChiDinh1: !this.state.isOpenChiDinh1,
    });
  };

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  handleDangNhap = async () => {
    let isLoggedInBN = this.props.isLoggedInBN;
    if (isLoggedInBN !== true) {
      this.props.history.push(`/login1`);
      // return (
      //     <Redirect to={'/login'} />
      // )
    }
  };

  // handleClickSearch = () => {
  //   this.setState({
  //     action: true,
  //   });
  // };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  handleOpenMenu = () => {
    this.setState({
      action: !this.state.action,
    });
    alert(this.state.action);
  };

  handleOpenDMK = () => {
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
    // let language = this.props.language;
    const { processBNLogout, language, benhnhanInfo, isLoggedInBN } =
      this.props;
    let dataPatient = this.state.dataPatient;
    let currentChidinh = this.state.chidinh;
    let currentChidinh1 = this.state.chidinh1;
    // let action = this.state.action;
    const { selectedOption } = this.state;
    return (
      <React.Fragment>
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
        <div className="home-header-container">
          <div className="khung">
            <div className="home-header-content">
              <div className="left-content">
                {/* <i
                  className="fas fa-bars"
                  onClick={() => {
                    this.handleOpenMenu();
                  }}
                ></i> */}
                <img
                  className="header-logo"
                  src={logo}
                  onClick={() => this.returnToHome()}
                />
              </div>
              {/* {this.state.action === true ? <MenuDoc /> : ""} */}

              <div className="center-content">
                <div className="child-content">
                  <div>
                    <b>
                      <FormattedMessage id="homeheader.speciality" />
                    </b>
                  </div>
                  <div className="subs-tilte">
                    <FormattedMessage id="homeheader.searchdocter" />
                  </div>
                </div>
                <div className="child-content">
                  <div>
                    <b>
                      <FormattedMessage id="homeheader.health-facility" />
                    </b>
                  </div>
                  <div className="subs-tilte">
                    <FormattedMessage id="homeheader.select-room" />
                  </div>
                </div>
                <div className="child-content">
                  <div>
                    {" "}
                    <b>
                      <FormattedMessage id="homeheader.doctor" />
                    </b>{" "}
                  </div>
                  <div className="subs-tilte">
                    <FormattedMessage
                      id="homeheader.select-doctor"
                      isLoggedInBN
                    />
                  </div>
                </div>
              </div>
              <div className="right-content">
                <button
                  className="mx-2 btn-section"
                  onClick={() => this.handleChiDinh1()}
                >
                  {isLoggedInBN ? (
                    <FormattedMessage id="homeheader.history" />
                  ) : (
                    ""
                  )}
                </button>
                {/* <div className='support'><i className='fas fa-question-circle'></i><FormattedMessage id="homeheader.support" /></div> */}
                <button
                  className="mx-2 btn-section"
                  onClick={() => this.handleDangNhap()}
                >
                  {isLoggedInBN ? (
                    ""
                  ) : (
                    <FormattedMessage id="homeheader.login" />
                  )}
                </button>

                <div
                  className={
                    language === LANGUAGES.VI
                      ? "language-vi active"
                      : "language-vi"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                    VN
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.EN
                      ? "language-en active"
                      : "language-en"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                    EN
                  </span>
                </div>
                {isLoggedInBN ? (
                  <span className="ten-BN">
                    <i className="fas fa-user"></i> &nbsp;
                    {isLoggedInBN ? benhnhanInfo.benhnhan.hoten : ""}{" "}
                    <div className="thongtin-BN">
                      <div className="tt">
                        <div className="tt-1">
                          <Link
                            to={"/information"}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <i className="fas fa-info"></i> &nbsp;
                            <FormattedMessage id="homeheader.thongtin" />
                          </Link>
                        </div>
                        <div
                          className="tt-2"
                          onClick={() => {
                            this.handleOpenDMK();
                          }}
                        >
                          <i className="fas fa-cog"></i> &nbsp;
                          <FormattedMessage id="homeheader.doimk" />
                        </div>
                        {/* <div className="tt-2">
                          <i className="fas fa-phone"></i> &nbsp;
                          <FormattedMessage id="homeheader.lienlac" />
                        </div>
                        <div className="tt-2">
                          <i className="fas fa-comments"></i> &nbsp;
                          <FormattedMessage id="homeheader.gopy" />
                        </div> */}
                      </div>
                    </div>
                  </span>
                ) : (
                  ""
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
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="tilte1">
                <FormattedMessage id="banner.tilte1" />
              </div>
              <div className="tilte2">
                <FormattedMessage id="banner.tilte2" />
              </div>

              <Select
                className="search"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                placeholder={
                  <i className="fas fa-search"> Tìm chuyên khoa khám bệnh</i>
                }
              />
            </div>
            <div className="menu-phu">
              <div className="icon-1">
                <p className="p1">
                  <Link
                    to={"/contact"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <i className="fas fa-phone"></i> &nbsp;
                    <FormattedMessage id="homeheader.lienlac" />
                  </Link>
                </p>
              </div>
              <div className="icon-2">
                <p className="p2">
                  <Link
                    to={"/feedback"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <i className="fas fa-comments"></i> &nbsp;
                    <FormattedMessage id="homeheader.gopy" />
                  </Link>
                </p>
              </div>
            </div>
            <div className="khung-tintuc">
              <div className="title">Tin Nổi Bật</div>
              <marquee direction="up" scrollamount="3" height="200px">
                <div className="khung">
                  <p>
                    <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC
                    SIÊU ÂM DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA
                    SIÊU ÂM ĐÀN HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI
                    TIRADS TUYẾN GIÁP
                  </p>
                  <p>
                    <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC
                    SIÊU ÂM DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA
                    SIÊU ÂM ĐÀN HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI
                    TIRADS TUYẾN GIÁP
                  </p>
                  <p>
                    <i className="fas fa-star"></i>&nbsp; CẬP NHẬT KIẾN THỨC
                    SIÊU ÂM DOPPLER ĐỘNG MẠCH CẢNH – ĐỐT SỐNG VÀ VAI TRÒ CỦA
                    SIÊU ÂM ĐÀN HỒI TRONG PHÂN LOẠI BIRADS TUYẾN VÚ VÀ PHÂN LOẠI
                    TIRADS TUYẾN GIÁP
                  </p>
                </div>
              </marquee>
            </div>
            <div
              className="content-down"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.1),rgba(255, 255, 255, 0.5),#f5f5f5)",
              }}
            >
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-microcope"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-tooth"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedInBN: state.benhnhan.isLoggedInBN,
    benhnhanInfo: state.benhnhan.benhnhanInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    processBNLogout: () => dispatch(actions.processBNLogout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
